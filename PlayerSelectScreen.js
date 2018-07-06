var PlayerSelectScreen = new function ()
{
	this.Start = function (numberOfPlayers)
	{
		// clear the button stuff and update params
		buttonMap = {'Current screen': 'Player select'};
		buttons = {};
		isHomeScreen = false;
		isPlayerSelectScreen = true;
		currentPlayer = 1;

		// update global variable
		playerCount = numberOfPlayers;

		// add buttons for each character
		characters.forEach( function(character, i)
		{
			let width = Math.round(stageWidth / characters.length);
			new Button(`${character}`, i * width, 100, width, 265, function ()
			{
				players[currentPlayer] = new Player(character);
				currentPlayer++;
			});
		});

	}
	this.Update = function ()
	{
		ctx.drawImage(imageLoader.GetImage('playerSelect'), 0, 0);
		
		if (currentPlayer <= playerCount)
		{
			WriteStroke(`Player ${currentPlayer}, select a character!`,100, 30);
		}
		else
		{
			GameActiveScreen.Start();
		}
	}
}