/**
 * Module dependencies.
 */

var fs = require('fs');
var read = fs.readFileSync;

module.exports = read('template.jade', { encode: 'utf8'});
