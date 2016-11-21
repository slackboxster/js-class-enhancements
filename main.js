var Through2 = require("through2");
var Vinyl = require('vinyl');
var injectEnhancement = require('./src/inject-enhancement');

function transform(file, enc, cb) {
    return injectEnhancement.transform(file, enc, cb);
    console.log('transform');
}

function flush(cb) {
    console.log('flushing');
    cb();
}

function plugin() {
    /* Transform gets called for each file; flush gets called at the end. */
    return Through2.obj(transform, flush);
}

module.exports = plugin;
