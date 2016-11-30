var Path = require('path');
var utils = require('./utils');

function transform(file) {

    var search = /Import \(.*$\)/g;

    file.contents = new Buffer(String(file.contents).replace(search, (match, p1) => {

        var pathArray = p1.split('.')
        var classname = pathArray.pop();

        var importPath = Path.relative(utils.dropFileName(file.path), file.base + pathArray.join('/'));

        if (importPath.indexOf('/') == -1) {
            importPath = './' + importPath
        }

        console.log(classname, importPath);

        return 'import {' + classname + '} from \'' + importPath + '\'';
    }));

    return file

}

module.exports = {
    transform: transform
}
