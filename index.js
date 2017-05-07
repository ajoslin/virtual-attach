'use strict'

var createElement = require('virtual-dom/create-element')
var diff = require('virtual-dom/diff')
var patch = require('virtual-dom/patch')
var debounce = require('frame-debounce')

var UNLISTEN_KEY = '__virtual-attach-unlisten'

module.exports = attach

function attach (state, render) {
  var vtree = render(state())
  var element = createElement(vtree)
  var unlisten = state(debounce(rerender))

  element[UNLISTEN_KEY] = unlisten

  return element

  function rerender (state) {
    var tree = render(state)
    var patches = diff(vtree, tree)
    patch(element, patches)
    vtree = tree
  }
}

attach.unlisten = function unlisten (element) {
  var fn = element && element[UNLISTEN_KEY]
  if (typeof fn === 'function') {
    fn()
    delete element[UNLISTEN_KEY]
  }
}
