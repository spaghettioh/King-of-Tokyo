function SetupMonsters()
{
	var headX = 0, fullX = 0;
	for (var i in characters)
	{
		monsters[i] = new function Monster()
		{
			this.name = characters[i];
			this.headImage = imgMonsterHeads;
			this.fullImage = imgMonstersFull;
			this.headStart = headX;
			this.fullStart = fullX;
			this.fullOffset = fullWH / 2;
		};
		headX += headWH;
		fullX += fullWH;
	}
}

function PlayerSelect(whichPlayer)
{
	// players select a character until all players are setup
	if (whichPlayer <= playerCount)
	{
		homeScreen = false;
		playerSelectScreen = true;
		WriteStroke(`Player ${whichPlayer}, select a character!`,100, 30);
	}
	else
	{
		playerSelectScreen = false;
		currentPlayer = 1;
		// deal the cards
		ResetCardsOnTable([1,1,1]);
		gameActive = true;
	}
}

function Player(whichMonster)
{
	// PLAYER STATS
	this.health = 10;
	this.score = 0;
	this.energy = 0;
	// PLAYER ATTRIBUTES
	this.healthMax = 10;
	this.isInTokyo = false;
	this.alive = true;
	this.cards = [];
	this.isPoisoned = false;
	this.monster = new function monster ()
	{
		// grab the monster image props based on the chosen monster
		for (var i in monsters)
		{
			if (monsters[i].name === whichMonster)
			{
				return monsters[i];
			}
		}
	}


	// PLAYER DICE
	this.diceCount = 6;
	this.rollCount = 3;

	// DICE METRICS health, 1, 2, 3, attack, energy
	this.resolvedDice = [0, 0, 0, 0, 0, 0];

	// PLAYER STAT LOCATIONS
	switch (currentPlayer)
	{
		// player 1 topLeft, player 2 topRight, player 3 bottomLeft, player 4 bottomRight
		// [[[[[ health x, y, score x, y, energy x, y, head x, y ]]]]]
		case 1: this.statsXY = [35, 9, 90, 9, 135, 9, 10, 30]; break;
		case 2: this.statsXY = [665, 9, 720, 9, 770, 9, stageWidth - headWH - 10, 30]; break;
		case 3: this.statsXY = [35,455,90,455,135,455,10,stageHeight-headWH - 30]; break;
		case 4: this.statsXY = [665,455,720,455,770,455,stageWidth-headWH - 10, stageHeight-headWH - 30]; break;
	}

	this.Draw = function()
	{
		if (this.alive === true)
		{
			// draw player full body in Tokyo
			if (this.isInTokyo === true)
			{
				ctx.save();
				ctx.translate(stageCenterXY[0] - (fullWH / 2), stageCenterXY[1] - (fullWH / 2));
				ctx.drawImage(this.monster.fullImage, this.monster.fullStart, 0, fullWH, fullWH, 0, 0, fullWH, fullWH);
				ctx.restore();
				// placeholder text when in Tokyo
				WriteStroke("In Tokyo",this.statsXY[6]+20,this.statsXY[7]+50)
			}
			// otherwise draw face in a corner
			else
			{
				ctx.drawImage(this.monster.headImage, this.monster.headStart, 0, headWH, headWH, this.statsXY[6], this.statsXY[7], headWH, headWH);
			}
		}

		// write stats
		WriteStroke(this.health, this.statsXY[0], this.statsXY[1]);
		WriteStroke(this.score, this.statsXY[2], this.statsXY[3]);
		WriteStroke(this.energy, this.statsXY[4], this.statsXY[5]);
	};
}

function PlayerTurn()
{
	// necessary?
	//	if (gameOver == false)
	WriteStroke(`Player: ${currentPlayer}`,(stageWidth/3),100);
	WriteStroke(`Current Roll: ${currentRoll} (of ${players[currentPlayer].rollCount})`, stageWidth / 2, 100);
	UpdateStats();
	ShowPlayerCards();
}

function AttackTokyo()
{
	// look for enemies in Tokyo
	for (var e = 1; e <= playerCount; e++)
	{
		if (players[e].isInTokyo == true)
		{
			// don't reduce health for Jets
			if (players[e].cards.indexOf('Jets') == -1)
			{
				players[e].health -= diceRoll[4].length;
			}

			if (players[e].health <= 0)
			{
				Ticker(`Player ${e} died in Tokyo!\n\nPlayer ${currentPlayer} takes their place!`);
				players[currentPlayer].isInTokyo = true;
				tokyoOccupiedBy = currentPlayer;
				players[currentPlayer].score++;
				// Set alive to false so the warning doesn't go off during updateStats
				players[e].alive = false;
				players[e].isInTokyo = false;
				players[e].health = 'X_X';
				deadPlayers++;

				// do not ask occupier if they want to leave
				attackingTokyo = false;
				return;
			}
			else
			{
				var exitTokyo = confirm(`Player ${e}, you were attacked and took ${diceRoll[4].length} damage!\n
					Do you want to yield Tokyo?`);

				switch (exitTokyo)
				{
					case true:
						// players in tokyo with jets don't take damage if they yield
						if (players[e].cards.indexOf('Jets') > -1)
						{
							PlayKeep('Jets');
						}
						players[e].isInTokyo = false;
						players[currentPlayer].isInTokyo = true;
						tokyoOccupiedBy = currentPlayer;
						Ticker(`Player ${currentPlayer} takes over Tokyo!`);
						// player gets a point for entering Tokyo
						players[currentPlayer].score++;
						return;

					case false:
						if (players[e].cards.indexOf('Jets') > -1)
						{
							players[e].health -= diceRoll[4].length;
						}
						break;

					default: 
						Ticker('Y or N, ya dingus!');
						AttackTokyo();
				}
			}
		}
	}
}

function FinishTurn()
{
	// next player
	currentPlayer++;
	if (currentPlayer > playerCount) 
	{
		currentPlayer = 1;
	}
	// skip dead players
	if (players[currentPlayer].alive == false) 
	{
		FinishTurn();
	}


	// reset dice roll
	currentRoll = 0;
	canRoll = true;
	rolledDice = [];
	for (var d in dice) 
	{
		dice[d].kept = false;
	}
	diceRoll = [ [], [], [], [], [], [] ];

	// player earns 2 points if in Tokyo
	if (players[currentPlayer].isInTokyo == true && currentRoll == 0)
	{
		players[currentPlayer].score += 2;
		Ticker(`Player ${currentPlayer} earned 2 points for staying in Tokyo!`);
	}
}