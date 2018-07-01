var GameActiveScreen = new function ()
{
	this.Update = function ()
	{
		tickerX += 10;
		ctx.drawImage(imageLoader.GetImage('gameBoard'), 0, 0);

		// draw players and their stats
		for (var p in players)
		{
			players[p].Draw();
		}

		PlayerTurn();

		// draw the dealt cards
		for (var card in cardsOnTable)
		{
			// card details starting position
			var cardX = 170 + (480 / 3 * card);

			if (tableCardsPreview)
			{
				cardsOnTable[card].Draw('big', cardX, 480 - (cardSizeHeight / 2.2));
			}
			else
			{
				cardsOnTable[card].Draw('big', cardX, 440);
			}
		}

		// draw paths over cardsOnTable for hover
		ctx.beginPath();
		if (tableCardsPreview)
		{
			ctx.rect(170, stageHeight - (cardSizeHeight / 2.2), 460, (cardSizeHeight / 2.2));
		}
		else
		{
			ctx.rect(170, 440, 460, 40);
		}

		// draw the dice when they are rolled
		if (rolledDice.length > 0)
		{
			// dice start X position
			var xpos = 170;

			// left border is 170
			// right border is 630
			// total avail width is 460
			// divided by dicecount
			// next die position should be previous die pos + 480 / count

			// cycle through dice and draw each one
			for (var d = 1; d <= players[currentPlayer].diceCount; d++)
			{
				// use green dice for more than 6 otherwise use black dice
				if (d > 6)
				{
					dice[d].Draw('green', dice[d].currentSide, xpos, 10);
				}
				else
				{
					dice[d].Draw('black', dice[d].currentSide, xpos, 10);
				}

				// move over depending on dice count (evenly spread)
				xpos += 480 / (players[currentPlayer].diceCount);
			}
		}

		WriteStroke(tickerStream, tickerX, 130);

		// draw game over and stats
		// keeping inside gameActive to show dimmed background
		if (isGameOver)
		{
			// click anywhere
			ctx.beginPath();
			ctx.rect(0, 0, stageWidth, stageHeight);

			// cover board to darken background
			ctx.drawImage(imageLoader.GetImage('gameOver'),0,0);

			// game over message
			WriteStroke(gameOverMessage,20,20);

			// display player & global stats
			var playerX = 20;

			for (var p in players)
			{
				var playerY = 100;

				WriteStroke(`Player ${p}`, playerX, playerY);
				WriteStroke(players[p].score, playerX, playerY += 20);
				WriteStroke(players[p].health, playerX, playerY += 20);
				WriteStroke(players[p].energy, playerX, playerY += 20);
				WriteStroke(players[p].energy, playerX, playerY += 20);
				playerX += 150;
			}

			// restart message
			WriteStroke(`Click anywhere to play again!`, 20, stageHeight - 29);
		}
	}
}