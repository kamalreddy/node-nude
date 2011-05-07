/**
 * test.nude.js
 */

var nude = new (require('../lib/node-nude')).nude();

var filename = __dirname + '/images/4.jpg';
nude.isnude(filename, function(result) {
  if (result) {
    console.log(filename + " : Nude!!");
  } else {
    console.log(filename + " : No nude!!");
  }
});
