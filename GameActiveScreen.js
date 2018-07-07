var GameActiveScreen = new function ()
{
	this.Start = function ()
	{
		// clear the button stuff and update params
		buttonMap = {'Current screen': 'Game active'};
		buttons = {};
		isPlayerSelectScreen = false;
		isGameActiveScreen = true;

		// player 1 starts, deal cards to buy
		currentPlayer = 1;
		DealCards([true,true,true]);
	}
	this.Update = function ()
	{
		tickerX += 10;
		ctx.drawImage(imageLoader.GetImage('gameBoard'), 0, 0);

		// draw players and their stats
		players.forEach( function(player)
		{
			player.Draw();
		});

		// draw dealt cards
		cardsOnTable.forEach( function(card, pos)
		{
			let cardX = [];
			if (cardsPreview)
			{
				cardX = [100,
					(stageWidth / 2) - (card.w / 2),
					stageWidth - 100 - card.w];
			}
			else
			{
				cardX = [stageWidth / 4,
					(stageWidth / 2) - (card.w / 2),
					stageWidth * .6];
			}

			new Button(card.name, cardX[pos], card.y, card.w, card.h, function()
			{
				cardsPreview = !cardsPreview;
			})
			card.Draw(cardX[pos]);
		});

		PlayerTurn();


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
			players.forEach( function(player, p)
			{
				var playerY = 100;

				WriteStroke(`Player ${p}`, playerX, playerY);
				WriteStroke(player.score, playerX, playerY += 20);
				WriteStroke(player.health, playerX, playerY += 20);
				WriteStroke(player.energy, playerX, playerY += 20);
				WriteStroke(player.energy, playerX, playerY += 20);
				playerX += 150;
			});

			// restart message
			WriteStroke(`Click anywhere to play again!`, 20, stageHeight - 29);
		}
	}
}

function UpdateStats()
{
	// alert for players that died last round
	for (var p = 1; p <= playerCount; p++)
	{
		// correct invalid values
		if (players[p].health < 0)
		{
			players[p].health = 0;
		}
		if (players[p].health > players[p].healthMax)
		{
			players[p].health = players[p].healthMax;
		}
		if (players[p].score < 0)
		{
			players[p].score = 0;
		}

		if (players[p].health == 0 && players[p].alive == true)
		{
			Ticker(`Player ${p} died!`);
			players[p].health = 'DEAD';
			players[p].alive = false;
			deadPlayers++;
		}
		// game over if score >= 20
		if (players[p].score >= 20)
		{
			gameOver = true;
			gameOverMessage = `GAME OVER!\n
				Player ${p} wins with a score of ${players[p].score}!`;
		}
	}

	// game over if one player remains
	if (deadPlayers === (playerCount - 1))
	{
		// find the alive player
		for (var p = 1; p <= playerCount; p++)
		{
			if (players[p].alive == true)
			{
				gameOver = true;
				gameOverMessage = `GAME OVER!\n
					Player ${p} is the last player standing!`;
			}
		}
	}
	if (deadPlayers == playerCount)
	{
		isGameOver = true;
		gameOverMessage = `GAME OVER!\n
			All players died!? I don't even...`;
	}
}



function GameOverScreen(reason)
{
	isGameOver = true;

}


function Ticker(message,bits)
{
	if (ticker.length >= 2)
	{
		ticker.shift();
		ticker.push(message);
	}
	else
	{
		ticker.push(message);
	}

	for (var text = 0; text < ticker.length; text++)
	{
		if (tickerStream.length > 0)
		{
			tickerStream = `${tickerStream} : ${ticker[text]}`;
		}
		else
		{
			tickerStream = ticker[text];
		}
	}

	/*	if (message == undefined) {return}
	if (length == undefined) {length = 10}

	writeStroke(message,(stageWidth / 2) - 250, 130);

	if (length > 0)
	{
	length--;
	setTimeout(function(){notification(message,length)},length*100);
	}
	*/
}