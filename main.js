var Through2 = require("through2");

var classpathBuilder = require('./src/classpath-builder');
var injectEnhancement = require('./src/inject-enhancement');
var importPreprocessor = require('./src/import-preprocessor');

//TODO: figure out a way to keep this inside the classpathBuilder
var moduleTree = { './': []}

function transform(file, enc, cb) {
    file = classpathBuilder.transform(file, moduleTree)
    file = injectEnhancement.transform(file)
    file = importPreprocessor.transform(file)

    cb(null, file)
}

function flush(cb) {
    classpathBuilder.flush(this, moduleTree)
    cb();
}

function plugin() {
    /* Transform gets called for each file; flush gets called at the end. */
    return Through2.obj(transform, flush);
}

module.exports = plugin;
