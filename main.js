var Through2 = require("through2");
var Vinyl = require('vinyl');

function transform() {
    console.log('transform');
}

function flush() {
    console.log('flushing');
}

function plugin() {
    return Through2.obj(
         function (file, enc, cb) {  //transform function -- called for each file
            transform();
        },
        function (cb) { // flush function -- called at the end
            flush();
            cb();
        }
    )
}

module.exports = plugin;
