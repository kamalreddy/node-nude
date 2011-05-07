/**
 * test.nude.js
 */

var nude = new (require('../lib/node-nude')).nude();

function scan(filename) {
  nude.isnude(filename, function(result) {
    if (result) {
      console.log(filename + " : Nude!!");
    } else {
      console.log(filename + " : No nude!!");
    }
  });
}

scan(__dirname + '/images/4.jpg');
// uncomment this once the speed issue has been addressed...right now it isn't pretty
//for (var i = 1; i < 5; i++) {
//  scan(__dirname + '/images/' + i +'.jpg');
//}
