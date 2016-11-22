module.exports = {

    lowercaseFirstLetter: function(string) {
        return string.charAt(0).toLowerCase() + string.slice(1);
    },

    dropFileName: function(path) {
        var pathArray = path.split('/');
        pathArray.pop()
        return pathArray.join('/');
    },

    removeDotJS: function (path) {
        return path.substr(0, path.lastIndexOf('.'));
    }

}
