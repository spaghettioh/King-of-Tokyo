/****************************************
tokyo.js
Created by Eric Mofield
http://www.spaghettioh.com
King of Tokyo Copyright Richard Garfield and Iello Games
****************************************/

// context.drawImage(img,x,y);
// context.drawImage(img,x,y,width,height);
// context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);

// STAGE VARS
var ctx;
var stageWidth = 800;
var stageHeight = 480;
var stageCenterXY = [stageWidth / 2, stageHeight / 2];
var canvas;
var mouseX = 0, mouseY = 0;
var imageLoader;

// GAMEPLAY
var isHomeScreen = false;
var isPlayerSelectScreen = false;
var isGameActive = false;
var isGameOver = false;

var tokyoOccupiedBy = 0;
var ticker = [];
var tickerX = 800;
var tickerStream = '';

// CARDS
var shuffledDeck = [];
var cardsOnTable = [];
var cardsOut = [];
var tableCardsPreview = false;

// PLAYERS
// ============== CAREFUL: Monster order is relative to image position
var characters = ['Alien', 'Cyber Bunny', 'Gigazaur', 'Kraken', 'Dragon', 'King'];
var monsters = [];
var iconWH = 130;
var iconCenter = iconWH / 2;
var headWH = 100;
var headCenter = headWH / 2;
var fullWH = 150;
var fullCenter = fullWH / 2;

var playerCount;
var players = [];
var currentPlayer;
var deadPlayers = 0;

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
	imageLoader = new BulkImageLoader();
	let images = [
		'cards', 'dice', 'diceKeep',
		'monsterHeads', 'monstersFull',
		'cover', 'playerSelect', 'gameBoard', 'gameOver'
		];
	for (let image in images)
	{
		imageLoader.AddImage(`assets/${images[image]}.png`, `${images[image]}`);
	}
	// call Start() when done assigning images
	imageLoader.OnReadyCallback = Start;
	imageLoader.LoadImages();
}

function Start()
{
	// HTML stuff
	canvas = document.getElementById('game');
	canvas.style.width = stageWidth;
	canvas.style.height = stageHeight;
	ctx = canvas.getContext('2d');
	ctx.canvas.width = stageWidth;
	ctx.canvas.height = stageHeight;
	canvas.addEventListener('mousemove', function(e) 
		{
			mouseX = e.pageX - canvas.offsetLeft;
			mouseY = e.pageY - canvas.offsetTop;
			if (ctx.isPointInPath(mouseX, mouseY))
			{
				e.target.style.cursor = 'pointer';
				return;
			}
			e.target.style.cursor = 'default';
		}, false);
	canvas.addEventListener('click', MouseClicked, false);
	addEventListener('keydown', KeyPressed, false);

	// font defaults
	ctx.font = '20px \'GOODGIRL\'';
	ctx.textBaseline = 'top';

	SetupDice();
	SetupDeck();
	SetupMonsters();

	// Kick off update at the homescreen
	isHomeScreen = true;
	setInterval(function()
	{
		Update();
	}, 1000/60);
}



function Update() {
	ctx.clearRect(0, 0, stageWidth, stageHeight);

	if (isHomeScreen)
	{
		HomeScreen.Update();
	}

	if (isPlayerSelectScreen)
	{
		PlayerSelectScreen.Update();
	}

	if (isGameActive)
	{
		GameActiveScreen.Update();
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
	if (deadPlayers == (playerCount - 1))
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



function WriteStroke(text,x,y)
{
	let gradient;

	ctx.lineWidth = 5;
    gradient = ctx.createLinearGradient(0, y, 0, y + 20);
	gradient.addColorStop('0.0','#555555');
	gradient.addColorStop('1.0','#000000');
	ctx.strokeStyle = gradient;
	ctx.strokeText(text, x, y);

	gradient = ctx.createLinearGradient(0, y, 0, y + 20);
	gradient.addColorStop('0.0','#EDEDED');
	gradient.addColorStop('1.0','#FFFFFF');
	ctx.fillStyle = gradient;
	ctx.fillText(text, x, y);
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