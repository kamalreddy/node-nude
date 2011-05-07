/*
 * Nude.js - Nudity detection with Javascript and HTMLCanvas
 * 
 * Author: Patrick Wied ( http://www.patrick-wied.at )
 * Version: 0.1  (2010-11-21)
 * License: MIT License
 */
var Worker = require('webworker').Worker;
var path = require('path');

var nude = function(){
		// private var definition
		this.canvas = null;
		this.ctx = null;
		this.img = null;
};
nude.prototype.init = function(cnvs){
			this.canvas = cnvs;
			// the canvas should not be visible
			//canvas.style.display = "none";
			this.ctx = this.canvas.getContext("2d");
		};

nude.prototype.load = function(image){
			this.img = image
			this.canvas.width = this.img.width;
			this.canvas.height = this.img.height;
			//img.setAttribute("style", "visibility:hidden;");
			//domPos = getPosition(img);
			// draw the image into the canvas element
			this.ctx.drawImage(this.img, 0, 0);

		};
nude.prototype.scan = function(callback){
			// get the image data
			var image = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height),
			imageData = image.data;
console.log('going to scan image');
			var myWorker = new Worker(path.join(__dirname, 'worker.js')),
			message = [imageData, this.canvas.width, this.canvas.height];
			myWorker.postMessage(message);
			myWorker.onmessage = function(event){
				callback(event.data);
			}
		};
		// colorizeRegions function is for testdevelopment only
		// the detected skinRegions will be painted in random colors (one color per region)
nude.prototype.colorizeRegions = function(){
			
			var length = skinRegions.length;
			for(var i = 0; i < length; i++){
				
				var region = skinRegions[i],
				regionLength = region.length,
				randR = Math.ceil(Math.random()*255),
				randG = Math.ceil(Math.random()*255),
				rangB = Math.ceil(Math.random()*255);
				
				for(var o = 0; o < regionLength; o++){
					
					var pixel = this.ctx.getImageData(region[o].x, region[o].y, 1,1),
					pdata = pixel.data;
					
					pdata[0] = randR;
					pdata[1] = randG;
					pdata[2] = rangB;
					
					pixel.data = pdata;
					
					this.ctx.putImageData(pixel, region[o].x, region[o].y);
					
				}
				
			}
			
		};

exports.nude = nude;
