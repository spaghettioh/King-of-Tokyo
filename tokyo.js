/****************************************
tokyo.js
Created by Eric Mofield
http://www.spaghettioh.com
King of Tokyo Copyright Richard Garfield and Iello Games
****************************************/

// STAGE VARS
var ctx;
var stageWidth = 800;
var stageHeight = 480;
var canvasElement;
var imgLoader;
var mouseX = 0;
var mouseY = 0;

// GAMEPLAY
var tokyoOccupiedBy = 0;
var homeScreen = false;
var playerSelectScreen = false;
var gameActive = false;
var gameOver = false;
var ticker = [];
var tickerX = 800;
var tickerStream = "";
var imgGameOver;

// CARDS
var shuffledDeck = [];
var cardsOnTable = [];
var cardsOut = [];
var tableCardsPreview = false;

// PLAYERS
var playerCount;
var players = [];
var currentPlayer;
var deadPlayers = 0;
var imgMonstersFull;
var imgMonsterHeads;
var monsterHeadWidth = 100;
var monsterFullWidth = 150;

// GLOBAL STATS
var totalResolvedDice = [0, 0, 0, 0, 0, 0];
var totalCardsCollected = 0;
var totalCardsPlayed = 0;

window.onload = preloadImages;




// ========== LOG 
/*
4.2.14.0124 made dice and keep evenly spread based on count
4.2.14.0215 added pointer over player select
4.3.14.0038 50% monster heads img, 50% monsters full img, game over screen, restart
4.4.14.0016 made dice into objects, imp'd dice.kept attribute
4.5.14.0219 made cards, dice, and players retain images. trying to fix. enabled mouseMoved()
4.13.14.1900 implemented refresh rate and fixed a ton of shit to go along with it
*/



// ========== FIX
// FUCKING FONT??
// cards for p3 and p4 overlap stats
// rollcount not updating with stay
// notification() flickering
// notification clearing game over screen
// FIXED images stay in tokyo
// FIXED kept cards not playing
// FIXED dynamic stage dimensions
// FIXED dice clearing before next turn


function preloadImages()
{
  imgLoader = new BulkImageLoader();
  imgLoader.addImage("assets/cards.png", "cards");
  imgLoader.addImage("assets/dice.png", "dice");
  imgLoader.addImage("assets/diceKeep.png", "diceKeep");
  imgLoader.addImage("assets/monsterHeads.png", "monsterHeads");
  imgLoader.addImage("assets/monstersFull.png", "monstersFull");
  imgLoader.addImage("assets/cover.png", "cover");
  imgLoader.addImage("assets/playerSelect.png", "playerSelect");
  imgLoader.addImage("assets/gameBoard.png", "gameBoard");
  imgLoader.addImage("assets/gameOver.png", "gameOver");
  imgLoader.onReadyCallback = Start;
  imgLoader.loadImages();
}

function Start()
{
  imgCards = imgLoader.getImageByName("cards");
  imgDice = imgLoader.getImageByName("dice");
  imgDiceKeep = imgLoader.getImageByName("diceKeep");
  imgMonsterHeads = imgLoader.getImageByName("monsterHeads");
  imgMonstersFull = imgLoader.getImageByName("monstersFull");
  imgCover = imgLoader.getImageByName("cover");
  imgPlayerSelect = imgLoader.getImageByName("playerSelect");
  imgGameBoard = imgLoader.getImageByName("gameBoard");
  imgGameOver = imgLoader.getImageByName("gameOver");
  
  canvasElement = document.getElementById("gameCanvas");
  canvasElement.style.width = stageWidth;
  canvasElement.style.height = stageHeight;
  canvasElement.addEventListener("click", mouseClicked, false);
  canvasElement.addEventListener("mousemove", mouseMoved, false);
  canvasElement.addEventListener("keydown",keyPressed,false);
  
  ctx = canvasElement.getContext("2d");
  ctx.canvas.width = stageWidth;
  ctx.canvas.height = stageHeight;
  ctx.fillStyle = "#FFF";
  ctx.font = "17px 'GOODGIRL'";
  ctx.textBaseline = 'top';
    
  setupDice();
  setupDeck();
  
  // Kick off update at the homescreen
  homeScreen = true;
  setInterval(function()
  {
    update();
  }, 1000/60);
}



function update() {
  //
  tickerX = 10;
  draw();
}

function draw() {
  ctx.clearRect(0, 0, stageWidth, stageHeight);
  
  if(homeScreen)
  {
    ctx.drawImage(imgCover, 0, 0);
    // draw paths over player selection for hover
    ctx.beginPath();
    ctx.rect(444, 380, 44, 60);
    ctx.rect(558, 380, 40, 60);
    ctx.rect(670, 380, 40, 60);
  }
  
  if(playerSelectScreen)
  {
    ctx.drawImage(imgPlayerSelect, 0, 0);
    playerSelect(currentPlayer);
    // draw paths over characters for hover
    ctx.beginPath();
    ctx.rect(0, 100, 800, 265);
  }
  
  if(gameActive)
  {
    ctx.drawImage(imgGameBoard, 0, 0);
    
    // draw players and their stats
    for(var p in players)
    {
      players[p].draw();
    }
    
    playerTurn();
      
    // draw the dealt cards
    for(var card in cardsOnTable)
    {
      // card details starting position
      var cardX = 170 + (480 / 3 * card);
      
      if(tableCardsPreview)
      {
        cardsOnTable[card].draw("big", cardX, 480 - (cardSizeHeight / 2.2));
      }
      else
      {
        cardsOnTable[card].draw("big", cardX, 440);
      }
    }
    
    // draw paths over cardsOnTable for hover
    ctx.beginPath();
    if(tableCardsPreview)
    {
      ctx.rect(170, stageHeight - (cardSizeHeight / 2.2), 460, (cardSizeHeight / 2.2));
    
    }
    else
    {
      ctx.rect(170, 440, 460, 40);
    }
    
    // draw the dice when they are rolled
    if(rolledDice.length > 0)
    {
      // dice start X position
      var xpos = 170;
  
      // left border is 170
      // right border is 630
      // total avail width is 460
      // divided by dicecount
      // next die position should be previous die pos + 480 / count
  
      // cycle through dice and draw each one
      for(var d = 1; d <= players[currentPlayer].diceCount; d++)
      {
        // use green dice for more than 6 otherwise use black dice
        if (d > 6)
        {
          dice[d].draw("green", dice[d].currentSide, xpos, 10);
        }
        else
        {
          dice[d].draw("black", dice[d].currentSide, xpos, 10);
        }
        
        // move over depending on dice count (evenly spread)
        xpos += 480 / (players[currentPlayer].diceCount);
      }
    }
    

    
    writeStroke(tickerStream, tickerX, 130);
    
    // draw game over and stats
    // keeping inside gameActive to show dimmed background
    if(gameOver)
    {
      // click anywhere
      ctx.beginPath();
      ctx.rect(0, 0, stageWidth, stageHeight);
      
      // cover board to darken background
      ctx.drawImage(imgGameOver,0,0);
      
      // game over message
      writeStroke(gameOverMessage,20,20);
  
      // display player & global stats
      var playerX = 20;
      
      for(var p in players)
      {
        var playerY = 100;
        
        writeStroke("Player " + p, playerX, playerY);
        writeStroke(players[p].score, playerX, playerY += 20);
        writeStroke(players[p].health, playerX, playerY += 20);
        writeStroke(players[p].energy, playerX, playerY += 20);
        writeStroke(players[p].energy, playerX, playerY += 20);
        playerX += 150;
      }
      
      // restart message
      writeStroke("Click anywhere to play again!", 20, stageHeight - 29);
    }
  }
}

function playerSelect(whichPlayer)
{
	// players select a character until all players are setup
	if(whichPlayer <= playerCount)
	{
		homeScreen = false;
		playerSelectScreen = true;
		
		writeStroke("Player " + whichPlayer + ", select a character!",100, 30);
		writeStroke(`Player ${whichPlayer}, select a character!`,100, 30);
	}
	else
	{
		startGame();
	}
}

function Player(monsterSelected)
{
	// PLAYER STATS
	this.health = 2;
	this.score = 0;
	this.energy = 50;
	
	// PLAYER ATTRIBUTES
	this.healthMax = 10;
	this.isInTokyo = false;
	this.alive = true;
	this.cards = [];
	this.isPoisoned = false;
	this.monster = monsterSelected;
	
	// monster images based on selection
	switch(this.monster)
	{
		case "alien": this.monsterHead = 0; this.monsterFull = 0; break;
		case "bunny": this.monsterHead = 100; this.monsterFull = 150; break;
		case "zaur": this.monsterHead = 200; this.monsterFull = 300; break;
		case "kraken": this.monsterHead = 300; this.monsterFull = 450; break;
		case "dragon": this.monsterHead = 400; this.monsterFull = 600; break;
		case "king": this.monsterHead = 500; this.monsterFull = 750; break;
	}
	
	// PLAYER DICE
	this.diceCount = 6;
	this.rollCount = 3;
	
	// DICE METRICS health, 1, 2, 3, attack, energy
	this.resolvedDice = [0, 0, 0, 0, 0, 0];
	
	// PLAYER STAT LOCATIONS
	switch(currentPlayer)
	{
		// player 1 topLeft, player 2 topRight, player 3 bottomLeft, player 4 bottomRight
		// [[[[[ health x, y, score x, y, energy x, y, head x, y ]]]]]
		case 1: this.statsXY = [35,9,90,9,135,9,10,30]; break;
		case 2: this.statsXY = [665,9,720,9,770,9,stageWidth - monsterHeadWidth - 10, 30]; break;
		case 3: this.statsXY = [35,455,90,455,135,455,10,stageHeight-monsterHeadWidth - 30]; break;
		case 4: this.statsXY = [665,455,720,455,770,455,stageWidth-monsterHeadWidth - 10, stageHeight-monsterHeadWidth - 30]; break;
	}
	
	this.draw = function()
	{
		if(this.alive == true)
		{
			// draw player picture
			if (this.isInTokyo == true)
			{
				ctx.drawImage(imgMonstersFull,this.monsterFull,0,monsterFullWidth,monsterFullWidth,(stageWidth / 2) - (monsterFullWidth / 2),(stageHeight / 2) - (monsterFullWidth / 2), monsterFullWidth, monsterFullWidth);
				// write tokyo where head should be
				writeStroke("In Tokyo",this.statsXY[6]+20,this.statsXY[7]+50)
			}
			else
			{
				ctx.drawImage(imgMonsterHeads,this.monsterHead,0,monsterHeadWidth,monsterHeadWidth,this.statsXY[6],this.statsXY[7],monsterHeadWidth,monsterHeadWidth);
			}
		}
		
		// write stats
		writeStroke(this.health, this.statsXY[0], this.statsXY[1]);
		writeStroke(this.score, this.statsXY[2], this.statsXY[3]);
		writeStroke(this.energy, this.statsXY[4], this.statsXY[5]);
	};
}





function playerTurn()
{
	// necessary?
//	if(gameOver == false)
	{
		writeStroke("Player: " + currentPlayer,(stageWidth/3),100);




    writeStroke("Current Roll:  " + currentRoll + " (of " + players[currentPlayer].rollCount + ")", stageWidth / 2, 100);
  





  console.log(`The eightball says ${gameOver}`)
		updateStats();
		
		showPlayerCards();
	}
}




function attackTokyo()
{
	// look for enemies in Tokyo
	for(var e = 1; e <= playerCount; e++)
	{
		if(players[e].isInTokyo == true)
		{
			// don't reduce health for Jets
			if(players[e].cards.indexOf("Jets") == -1)
			{
				players[e].health -= diceRoll[4].length;
			}
			
			if(players[e].health <= 0)
			{
				notification("Player " + e + " died in Tokyo!\n\nPlayer " + currentPlayer + " takes their place!");
				players[currentPlayer].isInTokyo = true;
				tokyoOccupiedBy = currentPlayer;
				players[currentPlayer].score++;
				// Set alive to false so the warning doesn't go off during updateStats
				players[e].alive = false;
				players[e].isInTokyo = false;
				players[e].health = "X_X";
				deadPlayers++;
				
				// do not ask occupier if they want to leave
				attackingTokyo = false;
				return;
			}
			else
			{
				var exitTokyo = confirm("Player " + e + ", you were attacked and took " + diceRoll[4].length + " damage!\nDo you want to yield Tokyo?");
				
				switch(exitTokyo)
				{
					case true:
						// players in tokyo with jets don't take damage if they yield
						if(players[e].cards.indexOf("Jets") > -1)
						{
							playKeep("Jets");
						}
						players[e].isInTokyo = false;
						players[currentPlayer].isInTokyo = true;
						tokyoOccupiedBy = currentPlayer;
						notification("Player " + currentPlayer + " takes over Tokyo!");
						// player gets a point for entering Tokyo
						players[currentPlayer].score++;
						return;
					case false:
						if(players[e].cards.indexOf("Jets") > -1)
						{
							players[e].health -= diceRoll[4].length;
						}
						break;
					default: notification("Y or N, ya dingus!"); attackTokyo();
				}
			}
		}
	}
}



function finishTurn()
{
	// next player
	currentPlayer++;
	if(currentPlayer > playerCount) {currentPlayer = 1}
	// skip dead players
	if(players[currentPlayer].alive == false) {finishTurn()}
	
	
	// reset dice roll
	currentRoll = 0;
	canRoll = true;
	rolledDice = [];
	for(var d in dice) {dice[d].kept = false;}
	diceRoll = [ [], [], [], [], [], [] ]
	
	// player earns 2 points if in Tokyo
	if(players[currentPlayer].isInTokyo == true && currentRoll == 0)
	{
		players[currentPlayer].score += 2;
		notification("Player " + currentPlayer + " earned 2 points for staying in Tokyo!");
	}
}



function updateStats()
{
	// alert for players that died last round
	for(var p = 1; p <= playerCount; p++)
	{
		// correct invalid values
		if(players[p].health < 0){players[p].health = 0}
		if(players[p].health > players[p].healthMax){players[p].health = players[p].healthMax}
		if(players[p].score < 0){players[p].score = 0}
		
		if(players[p].health == 0 && players[p].alive == true)
		{
			notification("Player " + p + " died!");
			players[p].health = "DEAD";
			players[p].alive = false;
			deadPlayers++;
		}
		// game over if score >= 20
		if(players[p].score >= 20)
		{
			gameOver = true;
			gameOverMessage = "GAME OVER!\nPlayer " + p + " wins with a score of " + players[p].score + "!";
		}
	}

	// game over if one player remains
	if(deadPlayers == (playerCount - 1))
	{
		// find the alive player
		for(var p = 1; p <= playerCount; p++)
		{
			if(players[p].alive == true)
			{
				gameOver = true;
				gameOverMessage = "GAME OVER!\nPlayer " + p + " is the last player standing!";
			}
		}
	}
	if(deadPlayers == playerCount)
	{
		gameOver = true;
		gameOverMessage = "GAME OVER!\nAll players died!? I don't even...";
	}
}



function gameOverScreen(reason)
{
	gameOver = true;
	
}



function writeStroke(text,x,y)
{
	ctx.fillText(text, x, y);
	ctx.strokeText(text, x, y);
}



function notification(message,bits)
{
	if(ticker.length >= 2)
	{
		ticker.shift();
		ticker.push(message);
	}
	else
	{
		ticker.push(message);
	}
	
	for(var text = 0; text < ticker.length; text++)
	{
		if(tickerStream.length > 0)
		{
			tickerStream = tickerStream + " : " + ticker[text];
		}
		else
		{
			tickerStream = ticker[text];
		}
	}
	
/*	if(message == undefined) {return}
	if(length == undefined) {length = 10}
	
	writeStroke(message,(stageWidth / 2) - 250, 130);
	
	if(length > 0)
	{
		length--;
		setTimeout(function(){notification(message,length)},length*100);
	}
*/
}








