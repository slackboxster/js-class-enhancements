
function lowercaseFirstLetter(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
}

var utils = {
    lowercaseFirstLetter: lowercaseFirstLetter,
}

module.exports = utils