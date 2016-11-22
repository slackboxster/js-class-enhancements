var Vinyl = require('vinyl');
var Path = require('path');
var utils = require('./utils');
var ObjectPath = require('object-path');

function transform(file, moduleTree) {
    //TODO: make functions, or use existing libraries, as appropriate
    var filePath = Path.relative(file.base, file.path)
    var pathArray = filePath.split('/'); //TODO: very much assuming this is Linux.
    pathArray.splice(0, 0, '.');
    var relativeFilename = utils.removeDotJS(pathArray.pop());

    ObjectPath.push(moduleTree, pathArray, relativeFilename);

    return file;
}

function flush(_this, moduleTree) {
    var files = createClasspathFile(moduleTree['.'], '.');

    files.forEach((file) => {
        console.log(file.path);
        _this.push(file);
    })

}

//TODO: replace this with lodash calls.
function createClasspathFile(subTree, context) {
    var classpathFileString = ''
    var files = [];
    for (var node in subTree) {

        if (typeof subTree[node] == "object" && subTree[node] !== null) {
            createClasspathFile(subTree[node], context + '/' + node).forEach( (file) => { files.push(file) });
            //TODO: create functions for getting the export line...
            classpathFileString += 'export * from \'./' + node + '/_classpath\'\n';
        } else { //if it is a file, add it to the current directory's file.
            classpathFileString += 'export * from \'./' + subTree[node] + '\'\n';
        }
    }

    var cpfile = new Vinyl({
        path: context + '/_classpath.js',
        contents: new Buffer(classpathFileString)
    });

    files.push(cpfile);

    return files;
}




module.exports = {
    transform: transform,
    flush: flush
}