var HomeScreen = new function ()
{
	this.Start = function ()
	{
		// clear the button map and reset
		buttonMap = {'Current screen': 'Home screen'};
		buttons = {};

		isHomeScreen = true;
		// add buttons for number of players
		new Button('2 players', 444, 380, 44, 60, function ()
		{
			PlayerSelectScreen.Start(2);
		});
		new Button('3 players', 558, 380, 40, 60, function ()
		{
			PlayerSelectScreen.Start(3);
		});
		new Button('4 players', 670, 380, 40, 60, function ()
		{
			PlayerSelectScreen.Start(4);
		});
	}

	this.Update = function()
	{
		ctx.drawImage(imageLoader.GetImage('cover'), 0, 0);
	}
}