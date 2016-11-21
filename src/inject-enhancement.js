var Through2 = require("through2");
var Path = require('path');
var utils = require('./utils');

/**
 * this has a simple task -- anywhere it finds @classpath(components.tabs.Tab), it replaces it with
 * import {Tab} from '(relative pathness)/components/tabs/_classpath'
 * The idea is to use simple replacement. So the last word is assumed to be the classname, the
 *
 * the next step: TODO: make it able to import multiple classes from a classpath file.
 * @returns {*}
 */
function plugin() {

    return Through2.obj(
        function (file, enc, cb) {  //transform function -- called for each file

            var search = /@FullInject\(([^)]*)\)/g;

            var constructor = ''

            file.contents = new Buffer(String(file.contents).replace(search, (match, p1) => {

                constructor += `    constructor(${p1}) {\n`;

                var items = p1.split(',');

                items.forEach(function(it) {
                    var include = it.trim();

                    constructor += `        this.${utils.lowercaseFirstLetter(include)} = ${include};\n`;
                });

                constructor += `    }\n`;

                return '@inject(' + p1 + ')';
            }));

            search = /@Constructor/g;
            file.contents = new Buffer(String(file.contents).replace(search, (match, p1) => {
                return constructor;
            }));

            if (constructor) {
                console.log(String(file.contents));
            }

            cb(null, file)
        }
    )
}

module.exports = plugin

// function lowercaseFirstLetter(string) {
//     return string.charAt(0).toLowerCase() + string.slice(1);
// }
