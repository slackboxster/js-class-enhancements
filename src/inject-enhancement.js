var utils = require('./utils');

function transform(file) {

    var search = /@inject\(([^)]*)\)/g;

    var constructor = ''

    file.contents = new Buffer(String(file.contents).replace(search, (match, p1) => {

        constructor += `constructor(${p1}) {\n`;

        var items = p1.split(',');

        items.forEach(function (it) {
            var include = it.trim();

            constructor += `        this.${utils.lowercaseFirstLetter(include)} = ${include};\n`;
        });

        // constructor += `    }\n`;

        return '@inject(' + p1 + ')';
    }));

    search = /constructor\s*\(\s*\)\s*\{/g;
    file.contents = new Buffer(String(file.contents).replace(search, (match, p1) => {
        return constructor;
    }));

    if (constructor) {
        console.log(String(file.contents));
    }

    return file
}

module.exports = {
    transform: transform
}
