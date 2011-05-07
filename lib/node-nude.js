/*
 * node-nude - node.js nudity detection based on nude.js
 * 
 * Author: goddamnbugs ( http://goddamnbugs.com/ ) ; based on Patrick Wied's nude.js ( http://www.patrick-wied.at )
 * Version: 0.2  (2011-05-06)
 * License: MIT License
 */

var Worker = require('webworker').Worker;
var path = require('path');

var nude = function(){
  this.canvas = null;
  this.ctx = null;
  this.img = null;
};
nude.prototype.init = function(cnvs){
  this.canvas = cnvs;
  this.ctx = this.canvas.getContext("2d");
};
nude.prototype.load = function(image){
  this.img = image
  this.canvas.width = this.img.width;
  this.canvas.height = this.img.height;
  // draw the image into the canvas element
  this.ctx.drawImage(this.img, 0, 0);
};
nude.prototype.scan = function(callback){
  // get the image data
  var image = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height),
  imageData = image.data;
  var myWorker = new Worker(
    path.join(__dirname, 'worker.js')),
    message = [imageData, this.canvas.width, this.canvas.height];
  
  myWorker.postMessage(message);
  myWorker.onmessage = function(event){
    callback(event.data);
    myWorker.terminate();
  }
};
nude.prototype.isnude = function(filename, callback) {
var Canvas = require('canvas');
var Image = Canvas.Image;
var fs = require('fs');

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
