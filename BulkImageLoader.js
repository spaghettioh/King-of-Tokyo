/****************************************/
/* BulkImageLoader.js
/* Created by Rhuno
/* http://www.rhuno.com/flashblog
/* Feel free to use this class as is or
/* make modifications as you see fit.
/****************************************/
function BulkImageLoader() {
	this.images = [];
	this.imagesLoaded = 0;
	this.isReady = false;
	
	this.onReadyCallback = function() {
		throw new Error("BulkImageLoader.onReadyCallback was not set");
	}
	
	this.onProgressCallback = function() {
		var result;
		if(this.images.length > 0) {
			result = this.imagesLoaded / this.images.length
//			ctx.fillRect(stageWidth/3,stageHeight,this.images.length * 10);
		} else {
			result = 0;
		}	
//		console.log("Image loader: " + result);
		return result;
	}
	
	this.onImageLoaded = function() {
		this.loader.imagesLoaded++;
		
		this.loader.onProgressCallback();
		
		if(this.loader.imagesLoaded == this.loader.images.length) {
			this.loader.isReady = true;
			this.loader.onReadyCallback();
		}
	}
	
	this.addImage = function (src, name)
	{
		var img 	= new Image();
		img.loader	= this;
		this.images.push( {image:img, source:src, imgName:name} );
	}
	
	this.loadImages = function() {
		for(var i = 0, len = this.images.length; i < len; i++) {
			this.images[i].image.src = this.images[i].source;			
			this.images[i].image.onload = this.onImageLoaded;
			this.images[i].image.name = this.images[i].imgName;
		}
	}
	
	this.getImageAtIndex = function(index) {
		return this.images[index].image;
	}
	
	this.getImageByName = function(name) {
		var img;
		
		for(var i = 0, len = this.images.length; i < len; i++) {
			if( this.images[i].imgName == name ) {
				img = this.images[i].image;
				i = len;
			}
		}
		
		return img;
	}	
}