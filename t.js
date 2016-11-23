var parser = require("comment-parser");
var fs = require("fs");

var parsed = parser(fs.readFileSync('styles.scss').toString());
console.log(JSON.stringify(parsed, null, 4));