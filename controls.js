function mouseMoved(e)
{
	mouseX = e.pageX - canvasElement.offsetLeft;
	mouseY = e.pageY - canvasElement.offsetTop;
	
	var canvas = e.target;
	
	if (ctx.isPointInPath(mouseX, mouseY))
	{
		canvas.style.cursor = 'pointer';

		return;
	}
	
	// Return the cursor to the default style
	canvas.style.cursor = 'default';
}



function mouseClicked(e)
{
	mouseX = e.pageX - canvasElement.offsetLeft;
	mouseY = e.pageY - canvasElement.offsetTop;
	
	// Four players max for now
	// homescreen player selection
	if (homeScreen)
	{
		// two 444, 380, 488, 440
		if (mouseX >= 444 && mouseX <= 488 && mouseY >= 380 && mouseY < 440) {playerCount = 2; playerSelect(currentPlayer = 1);}
		// three 558, 380, 598, 446
		else if (mouseX >= 558 && mouseX <= 598 && mouseY >= 380 && mouseY < 446) {playerCount = 3; playerSelect(currentPlayer = 1);}
		// four 670, 380, 710, 446
		else if (mouseX >= 670 && mouseX <= 710 && mouseY >= 380 && mouseY < 446) {playerCount = 4; playerSelect(currentPlayer = 1);}
	}
	
	if (playerSelectScreen)
	{
		if(mouseY >= 100 && mouseY <= 365)
		{
			if(mouseX >= 0 && mouseX <= stageWidth / 6) {players[currentPlayer] = new Player("alien"); currentPlayer++; playerSelect(currentPlayer);}
			else if(mouseX >= stageWidth / 6 && mouseX <= (stageWidth / 6) * 2) {players[currentPlayer] = new Player("bunny"); currentPlayer++; playerSelect(currentPlayer);}
			else if(mouseX >= (stageWidth / 6) * 2 && mouseX <= (stageWidth / 6) * 3) {players[currentPlayer] = new Player("zaur"); currentPlayer++; playerSelect(currentPlayer);}
			else if(mouseX >= (stageWidth / 6) * 3 && mouseX <= (stageWidth / 6) * 4) {players[currentPlayer] = new Player("kraken"); currentPlayer++; playerSelect(currentPlayer);}
			else if(mouseX >= (stageWidth / 6) * 4 && mouseX <= (stageWidth / 6) * 5) {players[currentPlayer] = new Player("dragon"); currentPlayer++; playerSelect(currentPlayer);}
			else if(mouseX >= (stageWidth / 6) * 5 && mouseX <= stageWidth) {players[currentPlayer] = new Player("king"); currentPlayer++; playerSelect(currentPlayer);}
		}
	}
	
	if(gameActive)
	{
		if(tableCardsPreview == false && mouseY > 440 && mouseX > 170 && mouseX < 630)
		{
			tableCardsPreview = true;
			
		}
		else if(tableCardsPreview == true)
		{
			if(mouseY > 480 - (cardSizeHeight / 2.2))
			{
				// first card
				if(mouseX > 170 && mouseX < 170 + (cardSizeWidth * 2.2))
				{
					console.log("trying to buy first card");
				}
				else if(mouseX > 170 + (cardSizeWidth * 2.2) && mouseX < 170 + (cardSizeWidth * 2.2 * 2))
				{
					console.log("trying to buy second card");
				}
				else if(mouseX > 170 + (cardSizeWidth * 2.2 * 2) && mouseX < 630)
				{
					console.log("trying to buy third card");
				}
			}
		}
		else
		{
			tableCardsPreview = false;
		}
	}
	
	if (gameOver)
	{
		if (ctx.isPointInPath(mouseX, mouseY)) {location.reload();}
	}
}


        
function keyPressed(e)
{
	if(gameActive == true && gameOver == false)
	{
		switch(e.keyCode)
		{
			// down key - roll
			case 40: if(currentRoll < players[currentPlayer].rollCount && canRoll == true) {rollDice(tumbleCounter);} break;
		
			// up key - next player
			case 38: if(currentRoll >= 3) {finishTurn()} break; // using static roll counter because giant brain adds another
		
			// 1, 2, 3, 4, 5, 6 - keep dice, include keypad
			case 49: case 97: if(currentRoll < players[currentPlayer].rollCount) {keepDie(1);} break;
			case 50: case 98: if(currentRoll < players[currentPlayer].rollCount) {keepDie(2);} break;
			case 51: case 99: if(currentRoll < players[currentPlayer].rollCount) {keepDie(3);} break;
			case 52: case 100: if(currentRoll < players[currentPlayer].rollCount) {keepDie(4);} break;
			case 53: case 101: if(currentRoll < players[currentPlayer].rollCount) {keepDie(5);} break;
			case 54: case 102: if(currentRoll < players[currentPlayer].rollCount) {keepDie(6);} break;
			case 55: case 103: if(currentRoll < players[currentPlayer].rollCount) {keepDie(7);} break;
			case 56: case 104: if(currentRoll < players[currentPlayer].rollCount) {keepDie(8);} break;
		
			// W wipe the cards
			case 87: 
				if(currentRoll >= 3) // using static roll counter because giant brain adds another
				{
					if(players[currentPlayer].energy >= 2)
					{
						resetCards([1,1,1],true)
					}
					else
					{
						notification("You can't afford to clear the table.");
					}
				}
				break;
		
			// P purchase a card
			case 80: 
				if(currentRoll >= 3 && players[currentPlayer].energy > 0) // using static roll counter because giant brain adds another
				{
					purchaseCard();
				}
				break; 
		
			// S stay with current roll
			case 83: if(currentRoll > 0 && currentRoll < 3 && canRoll == true) {canRoll = false; notification("Player " + currentPlayer + " stays!"); resolveDice();} break;
		}
	}
}