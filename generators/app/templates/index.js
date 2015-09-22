var <%= modJSName %> = require("./assets/scripts/<%= modFileName %>");

global.<%= modJSName %> = <%= modJSName %>;
module.exports = <%= modJSName %>;
