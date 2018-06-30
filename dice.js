// DICE
var dice = [];
var rolledDice = [];
var canRoll = true;
var tumbleCounter = 10;
var imgDice;
var dieKeepImg;
var dieSize = 50;
// Count types of dice into an array for resolving dice
// Global so cards can check
// Sequence is... health, 1, 2, 3, attack, energy
var diceRoll = [ [], [], [], [], [], [] ];

var currentRoll = 0;

function SetupDice() {
	// generate 8 dice, 6 + 2
	for (var i = 1; i <= 8; i++) {
		dice[i] = new Dice()
	}
}

function Dice()
{
	this.side0 = 'health';
	this.side1 = '1';
	this.side2 = '2';
	this.side3 = '3';
	this.side4 = 'attack';
	this.side5 = 'energy';
	this.sides = [this.side0, this.side1, this.side2, this.side3, this.side4, this.side5]
	this.currentSide = 0;
	this.kept = false;

	this.Draw = function(color, side, whereX, whereY)
	{
		// default y pos for black dice
		var ypos = 0;
		if (color === 'green')
		{
			ypos = dieSize;
		}

		// draw the die!
		if (this.kept == false)
		{
			ctx.drawImage(imgDice, dieSize * side, ypos, dieSize, dieSize, whereX, whereY, dieSize, dieSize);
		}
		else
		{
			ctx.drawImage(imgDiceKeep, whereX - 14, whereY - 14);
			ctx.drawImage(imgDice, dieSize * side, ypos, dieSize, dieSize, whereX, whereY, dieSize, dieSize);
		}
	};
}

function RollDice(tumble)
{
	// cycle through dice and pick a side
	for (var d = 1; d <= players[currentPlayer].diceCount; d++)
	{
		if (dice[d].kept == false)
		{
			var randomSide = Math.floor(Math.random() * 6);
			rolledDice[d - 1] = dice[d].sides[randomSide];
			dice[d].currentSide = randomSide;
		}
	}

	tumble--;

	// keep tumbling
	if (tumble > 1)
	{
		canRoll = false;
		setTimeout(function(){
			RollDice(tumble);
		},500/tumble);
	}
	else
	{
		currentRoll++;
		canRoll = true;

		// resolve on the last roll
		if (currentRoll == players[currentPlayer].rollCount)
		{
			ResolveDice();
			canRoll = false;
		}
	}
}



function KeepDie(d)
{
	if (currentRoll > 0 && d <= players[currentPlayer].diceCount)
	{
		// if it's not already kept, keep it
		if (dice[d].kept == false)
		{
			dice[d].kept = true;
		}
		// otherwise unkeep it
		else
		{
			dice[d].kept = false;
		}
	}
}



function ResolveDice()
{
	// cycle through each die and push a value to the relative diceRoll slot
	for (var d in rolledDice)
	{
		switch(rolledDice[d])
		{
			case 'health': diceRoll[0].push('health'); break;
			case '1': diceRoll[1].push('1'); break;
			case '2': diceRoll[2].push('2'); break;
			case '3': diceRoll[3].push('3'); break;
			case 'attack': diceRoll[4].push('attack'); break;
			case 'energy': diceRoll[5].push('energy'); break;
		}
	}

	// Background dweller - reroll any 3
	if (diceRoll[3].length > 0 && players[currentPlayer].cards.indexOf('Background Dweller') > -1)
	{
		PlayKeep('Background Dweller');
	}

	var attackingTokyo = false;

	for (var faceType = 0; faceType < diceRoll.length; faceType++)
	{
		// add to stats
		players[currentPlayer].resolvedDice[faceType] += diceRoll[faceType].length;
		totalResolvedDice[faceType] += diceRoll[faceType].length;

		// only do stuff if a face type was actually rolled
		if (diceRoll[faceType].length > 0)
		{
			// faceType is... health,1,2,3,attack,energy
			switch(faceType)
			{
				// health
				case 0:
					// add 1 health for each die up to player max (to allow for cards) when not in Tokyo
					if (players[currentPlayer].isInTokyo == false)
					{
						players[currentPlayer].health += diceRoll[faceType].length;
					}
					break;

				// scoring
				case 1:
				case 2:
				case 3:
					// tally points of three of a kind or more
					// additional dice of a type are worth 1
					// 8 to accommodate for extra dice
					switch(diceRoll[faceType].length)
					{
						case 3: players[currentPlayer].score += (faceType); break;
						case 4: players[currentPlayer].score += (faceType + 1); break;
						case 5: players[currentPlayer].score += (faceType + 2); break;
						case 6: players[currentPlayer].score += (faceType + 3); break;
						case 7: players[currentPlayer].score += (faceType + 4); break;
						case 8: players[currentPlayer].score += (faceType + 5); break;
					}

					// player wins if score >= 20
					if (players[currentPlayer].score >= 20)
					{
						gameOverMessage = `Player ${currentPlayer} wins with a score of ${players[currentPlayer].score}!`;
						gameOver = true;
						return;
					}
					break;

				// attack
				case 4:
					// player occupies Tokyo if empty
					if (tokyoOccupiedBy == 0)
					{
						Ticker(`Player ${currentPlayer} rolled an attack and entered Tokyo!`);
						tokyoOccupiedBy = currentPlayer;
						players[currentPlayer].isInTokyo = true;
						players[currentPlayer].score++;
						break;
					}

					// when in tokyo attack all players not this player
					if (players[currentPlayer].isInTokyo == true)
					{
						for (var e in players)
						{
							// avoid affecting dead players
							if (currentPlayer != e && players[e].alive == true)
							{
								players[e].health -= diceRoll[faceType].length;
							}
						}
					}
					// otherwise attack tokyo
					else
					{
						for (var e = 1; e <= playerCount; e++)
						{
							if (currentPlayer != e && players[e].isInTokyo == true)
							{
								attackingTokyo = true;
							}
						}
					}

					break;

				// energy
				case 5:
					players[currentPlayer].energy += diceRoll[faceType].length;
					break;
			}
		}
	}


	// ===========================================
	// add logic to protect players with defensive cards
	// give Tokyo occupant chance to exit
	if (attackingTokyo == true)
	{
		AttackTokyo();
	}

	// enact kept cards
	if (players[currentPlayer].cards.length > 0)
	{
		for (var card in players[currentPlayer].cards)
		{
			PlayCardResolve(players[currentPlayer].cards[card]);
		}
	}

	// set current roll to player max in case player Stays with roll
	currentRoll = players[currentPlayer].rollCount;
}

