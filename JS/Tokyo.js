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
		'Cards', 'Cover', 'Dice', 'DiceKeep',
		'GameBoard', 'GameOver', 'MonstersHead',
		'MonstersFull', 'MonstersIcon', 'PlayerSelect'
		];
	images.forEach( function(image)
	{
		imageLoader.AddImage(`../Assets/Sprites/${image}.png`, `${image}`);
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

	setInterval(Update, 1000/60);
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

	// Box.Draw();
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

// var time;
// function Tween (obj, props)
// {
// 	// props = x, y, w, h, time, callback
// 	if (!time)
// 	{
// 		time = props.time;
// 	}
// 	props.time -= 100;
// 	console.log(props.time);
// 	console.log(time);

// 	if (props.time > 0)
// 	{
// 		obj.x += props.x / time;
// 		obj.y += props.y / time;
// 		obj.w += props.w / time;
// 		obj.h += props.h / time;
// 		setTimeout(function() {Tween(obj, props)}, time / props.time);

// 	}
// 	else
// 	{
// 		time = 0;
// 		return props.callback;
// 	}
// }


// var Box = new function ()
// {
// 	this.startingPos = true;
// 	this.x = 0;
// 	this.y = 0;
// 	this.w = 50;
// 	this.h = 50;
// 	this.Draw = function ()
// 	{
// 		ctx.fillStyle = '#FF0000';
// 		ctx.fillRect(this.x, this.y, this.w, this.h);
// 	};
// }


// if (Box.startingPos)
// {
// 	Tween(Box, 
// 	{
// 		x: stageWidth * .5,
// 		y: stageHeight * .5,
// 		w: 300,
// 		h: 300,
// 		time: 3000,
// 		callback: !Box.position
// 	})
// }

// function Thing ()
// {
// 	var element = document.getElementById('moving');
// 	var bg = document.getElementById('background');

// 	bg.addEventListener('click', function(evt) {
// 	  animate({
// 	    x: evt.offsetX,
// 	    y: evt.offsetY
// 	  });
// 	}, false);

// 	function getPosition() {
// 	  return {
// 	    x: element.offsetLeft,
// 	    y: element.offsetTop
// 	  };
// 	}
// 	function setPosition(x, y) {
// 	  element.style.left = x + 'px';
// 	  element.style.top = y + 'px';
// 	}

// 	function easing(x) {
// 	  return 0.5 + 0.5 * Math.sin((x - 0.5) * Math.PI);
// 	}

// 	function animate(target) {
// 	  var initial = getPosition();
// 	  var initialX = initial.x;
// 	  var initialY = initial.y;
// 	  var targetX = target.x;
// 	  var targetY = target.y;
// 	  var deltaX = targetX - initialX;
// 	  var deltaY = targetY - initialY;

// 	  var timeStart = timestamp();
// 	  var timeLength = 800;

// 	  var timer = setInterval(update, 10);

// 	  function timestamp() {
// 	    return Date.now();
// 	  }
// 	  function stop() {
// 	    clearInterval(timer);
// 	  }

// 	  function update() {
// 	    var t = (timestamp() - timeStart) / timeLength;
// 	    if (t > 1) {
// 	      fraction(1);
// 	      stop();
// 	    } else {
// 	      fraction(easing(t));
// 	    }
// 	  }
// 	  function fraction(t) {
// 	    setPosition(initialX + t * deltaX, initialY + t * deltaY);
// 	  }
// 	}
// }