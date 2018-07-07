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
var isGameActiveScreen = false;
var isGameOver = false;

var buttonMap = {};
var buttons = {};
// var buttonsHomeScreen = {
// 	'2 players': new Button([444, 380, 44, 60], function ()
// 		{
// 			playerCount = 2;
// 			PlayerSelect(currentPlayer = 1);
// 		}),
// 	'3 players': '',
// 	'4 players': ''
// };
// var buttonsPlayerSelectScreen = {
// 	'Alien': '',
// 	'Cyber Bunny': '',
// 	'Gigazaur': '',
// 	'Kraken': '',
// 	'Dragon': '',
// 	'King': ''
// };
// var buttonsGameActiveScreen = {
// 	'roll dice': ''
// };

var tokyoOccupiedBy = 0;
var ticker = [];
var tickerX = 800;
var tickerStream = '';


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

// ========== FIX
// FUCKING FONT??
// cards for p3 and p4 overlap stats
// rollcount not updating with stay
// notification() flickering
// notification clearing game over screen

function preloadImages ()
{
	imageLoader = new BulkImageLoader();
	let images = [
		'cards', 'dice', 'diceKeep',
		'monsterHeads', 'monstersFull',
		'cover', 'playerSelect', 'gameBoard', 'gameOver'
		];
	images.forEach( function(image)
	{
		imageLoader.AddImage(`assets/${image}.png`, `${image}`);
	});
	// call Start() when done assigning images
	imageLoader.OnReadyCallback = Start;
	imageLoader.LoadImages();
}

function Start ()
{
	// HTML stuff
	canvas = document.getElementById('game');
	canvas.style.width = stageWidth;
	canvas.style.height = stageHeight;
	ctx = canvas.getContext('2d');
	ctx.canvas.width = stageWidth;
	ctx.canvas.height = stageHeight;
	canvas.addEventListener('mousemove', MouseMoved, false);
	canvas.addEventListener('click', MouseClicked, false);
	addEventListener('keydown', KeyPressed, false);

	// font defaults
	ctx.font = '20px \'GOODGIRL\'';
	ctx.textBaseline = 'top';

	buttonsPlayerSelectScreen = {
		'Alien': '',
		'Cyber Bunny': '',
		'Gigazaur': '',
		'Kraken': '',
		'Dragon': '',
		'King': ''
	};
	buttonsGameActiveScreen = {
		'roll dice': ''
	};

	SetupDice();
	SetupDeck();
	SetupMonsters();

	HomeScreen.Start();

	setInterval(function()
	{
		Update();
	}, 1000/60);
}



function Update () {
	ctx.clearRect(0, 0, stageWidth, stageHeight);

	if (isHomeScreen)
	{
		HomeScreen.Update();
	}
	else if (isPlayerSelectScreen)
	{
		PlayerSelectScreen.Update();
	}
	else if (isGameActiveScreen)
	{
		GameActiveScreen.Update();
	}

	// // draw all the buttons for that screen
	// for (var btn in buttons)
	// {
	// 	ctx.beginPath();
	// 	ctx.rect(buttons[btn].x, buttons[btn].y, buttons[btn].w, buttons[btn].h);
	// }
}

function Button (name, startX, startY, w, h, action)
{
	buttons[`${name}`] = {
		x: startX,
		y: startY,
		w: w,
		h: h
	}

	for (let x = startX; x < (startX + w); x++)
	{
		for (let y = startY; y < startY + h; y++)
		{
			// add the coordinates and action to the buttonMap
			buttonMap[`${x},${y}`] = action;
		}
	}
}

function WriteStroke (text,x,y)
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

function Tween (target)
{

}