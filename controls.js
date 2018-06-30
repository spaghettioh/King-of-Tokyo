function MouseMoved(e)
{
	var mouseX = e.pageX - canvas.offsetLeft;
	var mouseY = e.pageY - canvas.offsetTop;
	var dom = e.target;
	
	if (ctx.isPointInPath(mouseX, mouseY))
	{
		dom.style.cursor = 'pointer';
		return;
	}
	
	// Return the cursor to the default style
	dom.style.cursor = 'default';
}



function MouseClicked(e)
{
	var mouseX = e.pageX - canvas.offsetLeft;
	var mouseY = e.pageY - canvas.offsetTop;
	
	// Four players max for now
	// homescreen player selection
	if (homeScreen)
	{
		// two 444, 380, 488, 440
		if (mouseX >= 444 && mouseX <= 488 && mouseY >= 380 && mouseY < 440)
		{
			playerCount = 2;
			PlayerSelect(currentPlayer = 1);
		}
		// three 558, 380, 598, 446
		else if (mouseX >= 558 && mouseX <= 598 && mouseY >= 380 && mouseY < 446)
		{
			playerCount = 3;
			PlayerSelect(currentPlayer = 1);
		}
		// four 670, 380, 710, 446
		else if (mouseX >= 670 && mouseX <= 710 && mouseY >= 380 && mouseY < 446)
		{
			playerCount = 4;
			PlayerSelect(currentPlayer = 1);
		}
	}
	
	if (playerSelectScreen)
	{
		if (mouseY >= 100 && mouseY <= 365)
		{
			if (mouseX >= 0 && mouseX <= stageWidth / 6)
			{
				players[currentPlayer] = new Player(characters[0]);
				currentPlayer++;
				PlayerSelect(currentPlayer);
			}
			else if (mouseX >= stageWidth / 6 && mouseX <= (stageWidth / 6) * 2)
			{
				players[currentPlayer] = new Player(characters[1]);
				currentPlayer++;
				PlayerSelect(currentPlayer);
			}
			else if (mouseX >= (stageWidth / 6) * 2 && mouseX <= (stageWidth / 6) * 3)
			{
				players[currentPlayer] = new Player(characters[2]);
				currentPlayer++;
				PlayerSelect(currentPlayer);
			}
			else if (mouseX >= (stageWidth / 6) * 3 && mouseX <= (stageWidth / 6) * 4)
			{
				players[currentPlayer] = new Player(characters[3]);
				currentPlayer++;
				PlayerSelect(currentPlayer);
			}
			else if (mouseX >= (stageWidth / 6) * 4 && mouseX <= (stageWidth / 6) * 5)
			{
				players[currentPlayer] = new Player(characters[4]);
				currentPlayer++;
				PlayerSelect(currentPlayer);
			}
			else if (mouseX >= (stageWidth / 6) * 5 && mouseX <= stageWidth)
			{
				players[currentPlayer] = new Player(characters[5]);
				currentPlayer++;
				PlayerSelect(currentPlayer);
			}
		}
	}
	
	// if (gameActive)
	// {
	// 	if (tableCardsPreview == false && mouseY > 440 && mouseX > 170 && mouseX < 630)
	// 	{
	// 		tableCardsPreview = true;
	// 	}
	// 	else if (tableCardsPreview == true)
	// 	{
	// 		if (mouseY > 480 - (cardSizeHeight / 2.2))
	// 		{
	// 			// first card
	// 			if (mouseX > 170 && mouseX < 170 + (cardSizeWidth * 2.2))
	// 			{
	// 				console.log('trying to buy first card');
	// 			}
	// 			else if (mouseX > 170 + (cardSizeWidth * 2.2) && mouseX < 170 + (cardSizeWidth * 2.2 * 2))
	// 			{
	// 				console.log('trying to buy second card');
	// 			}
	// 			else if (mouseX > 170 + (cardSizeWidth * 2.2 * 2) && mouseX < 630)
	// 			{
	// 				console.log('trying to buy third card');
	// 			}
	// 		}
	// 	}
	// 	else
	// 	{
	// 		tableCardsPreview = false;
	// 	}
	// }
	
	if (gameOver)
	{
		if (ctx.isPointInPath(mouseX, mouseY)) 
		{
			location.reload();
		}
	}
}


        
function KeyPressed(e)
{
	if (gameActive == true && gameOver == false)
	{
		switch (e.keyCode)
		{
			// down key - roll
			case 40: if (currentRoll < players[currentPlayer].rollCount && canRoll == true) {RollDice(tumbleCounter);} break;
		
			// up key - next player
			case 38: if (currentRoll >= 3) {FinishTurn()} break; // using static roll counter because giant brain adds another
		
			// 1, 2, 3, 4, 5, 6 - keep dice, include keypad
			case 49: case 97: if (currentRoll < players[currentPlayer].rollCount) {KeepDie(1);} break;
			case 50: case 98: if (currentRoll < players[currentPlayer].rollCount) {KeepDie(2);} break;
			case 51: case 99: if (currentRoll < players[currentPlayer].rollCount) {KeepDie(3);} break;
			case 52: case 100: if (currentRoll < players[currentPlayer].rollCount) {KeepDie(4);} break;
			case 53: case 101: if (currentRoll < players[currentPlayer].rollCount) {KeepDie(5);} break;
			case 54: case 102: if (currentRoll < players[currentPlayer].rollCount) {KeepDie(6);} break;
			case 55: case 103: if (currentRoll < players[currentPlayer].rollCount) {KeepDie(7);} break;
			case 56: case 104: if (currentRoll < players[currentPlayer].rollCount) {KeepDie(8);} break;
		
			// W wipe the cards
			case 87: 
				if (currentRoll >= 3) // using static roll counter because giant brain adds another
				{
					if (players[currentPlayer].energy >= 2)
					{
						ResetCards([1,1,1],true)
					}
					else
					{
						Ticker(`You can't afford to clear the table.`);
					}
				}
				break;
		
			// P purchase a card
			case 80: 
				if (currentRoll >= 3 && players[currentPlayer].energy > 0) // using static roll counter because giant brain adds another
				{
					PurchaseCard();
				}
				break; 
		
			// S stay with current roll
			case 83: 
				if (currentRoll > 0 && currentRoll < 3 && canRoll == true) 
				{
					canRoll = false;
					Ticker(`Player ${currentPlayer} stays!`);
					ResolveDice();
				}
				break;
		}
	}
}