/**
 * Module dependencies.
 */

var log = require('debug')('header:view');
var splash = require('./template');
var domify = require('domify');
var query = require('query');

/**
 * Expose `HeaderView` class
 */

module.exports = HeaderView;

/**
 * Create a `HeaderView` view instance
 */

function HeaderView() {
  if (!(this instanceof HeaderView)) {
    return new HeaderView();
  };

  log('initialize');
  this.el = domify(splash());
}

/**
 * Render `View.el` into `el`
 * or return `this.el`
 *
 * @return {View|Element} `View` instance or `View.el`
 * @api public
 */

HeaderView.prototype.render = function(el) {
  // if no arguments, return `this.el` instead
  if (0 === arguments.length) return this.el;

  // if string, then query element
  if ('string' === typeof el) {
    el = query(el);
  };

  // if it's not currently inserted
  // at `el`, then append to `el`
  if (el !== this.el.parentNode) {
    el.appendChild(this.el);
  };

  return this;
}
