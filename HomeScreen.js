var HomeScreen = new function ()
{
	this.Update = function()
	{
		ctx.drawImage(imageLoader.GetImage('cover'), 0, 0);
		// draw paths over player selection for hover
		ctx.beginPath();
		ctx.rect(444, 380, 44, 60);
		ctx.rect(558, 380, 40, 60);
		ctx.rect(670, 380, 40, 60);
	}
}