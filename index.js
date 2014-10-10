/**
 * Module dependencies.
 */

var fs = require('fs');
var read = fs.readFileSync;
var jade = require('jade');

var header = jade.compile(read('./template.jade', { encode: 'utf8'}));

module.exports = render;

function render(options) {
  options = options || {};

  if (!options.base_url) options.base_url = '';

  return header(options)
}
