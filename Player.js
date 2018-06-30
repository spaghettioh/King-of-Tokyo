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
				ctx.translate(stageCenterXY[0], stageCenterXY[1]);
				ctx.drawImage(this.full,stageCenter[0],0,fullWH,monsterFullWidth,(stageWidth / 2) - (monsterFullWidth / 2),(stageHeight / 2) - (monsterFullWidth / 2), monsterFullWidth, monsterFullWidth);
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
