var PlayerSelectScreen = new function ()
{
	this.Update = function ()
	{
		ctx.drawImage(imageLoader.GetImage('playerSelect'), 0, 0);
		// draw paths over characters for hover
		ctx.beginPath();
		ctx.rect(0, 100, 800, 265);
		PlayerSelect(currentPlayer);
	}
}

function PlayerSelect(whichPlayer)
{
	// players select a character until all players are setup
	if (whichPlayer <= playerCount)
	{
		isHomeScreen = false;
		isPlayerSelectScreen = true;
		WriteStroke(`Player ${whichPlayer}, select a character!`,100, 30);
	}
	else
	{
		isPlayerSelectScreen = false;
		currentPlayer = 1;
		// deal the cards
		ResetCardsOnTable([1,1,1]);
		isGameActive = true;
	}
}