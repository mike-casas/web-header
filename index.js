/**
 * Module dependencies.
 */

var fs = require('fs');
var path = require('path');
var read = fs.readFileSync;
var resolve = path.resolve;
var jade = require('jade');

var headerPath = resolve(__dirname, './template.jade');
var header = jade.compile(read(headerPath, { encode: 'utf8'}));

module.exports = render;

function render(options) {
  options = options || {};

  if (!options.base_url) options.base_url = '';

  return header(options)
}
