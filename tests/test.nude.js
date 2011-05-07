/**
 * test.nude.js
 */

var Canvas = require('canvas')
  , Image = Canvas.Image
  , fs = require('fs')
  , nude = new (require('../lib/node-nude')).nude();

var img = new Image
  , start = new Date;

img.onerror = function(err){
  throw err;
};

img.onload = function(){
  var width = img.width
    , height = img.height
    , canvas = new Canvas(width, height)
    , ctx = canvas.getContext('2d');
  console.log(img);
  ctx.drawImage(img, 0, 0, width, height);
  nude.init(canvas);
  nude.load(img);
  nude.scan(function(result) {
    if (result) {
      console.log(img.src + " : Nude!!");
    } else {
      console.log(img.src + " : No nude!!");
    }
  });
};

img.src = __dirname + '/images/3.jpg';
