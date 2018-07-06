var PlayerSelectScreen = new function ()
{
	this.Start = function (numberOfPlayers)
	{
		// clear the button map
		buttonMap = {'Current screen': 'Player select'};
		buttons = {};
		isHomeScreen = false;
		// update global variable
		playerCount = numberOfPlayers;

		characters.forEach( function(character, i)
		{
			let width = Math.round(stageWidth / characters.length);
			// add a button based on the number 
			new Button(`${character}`, i * width, 100, width, 265, function ()
			{
				players[currentPlayer] = new Player(character);
				currentPlayer++;
			});
		});
		
		isPlayerSelectScreen = true;
		currentPlayer = 1;
	}
	this.Update = function ()
	{
		ctx.drawImage(imageLoader.GetImage('playerSelect'), 0, 0);
		// players select a character until all players are setup
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