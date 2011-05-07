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
			var myWorker = new Worker(path.join(__dirname, 'worker.js')),
			message = [imageData, this.canvas.width, this.canvas.height];
			myWorker.postMessage(message);
			myWorker.onmessage = function(event){
			  callback(event.data);
                          myWorker.terminate();
			}
		};
nude.prototype.isnude = function(filename, callback) {
var Canvas = require('canvas')
  , Image = Canvas.Image
  , fs = require('fs');

var img = new Image;

img.onerror = function(err){
  throw err;
};

var self = this;
img.onload = function(){
  var width = img.width
    , height = img.height
    , canvas = new Canvas(width, height)
    , ctx = canvas.getContext('2d');
  console.log(img);
  ctx.drawImage(img, 0, 0, width, height);
  self.init(canvas);
  self.load(img);
  self.scan(function(result) {
    callback(result);
  });
};

//img.src = __dirname + '/images/3.jpg';
img.src = filename;

};
exports.nude = nude;
