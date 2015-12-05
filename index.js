'use strict'

var createElement = require('virtual-dom/create-element')
var diff = require('virtual-dom/diff')
var patch = require('virtual-dom/patch')
var debounce = require('frame-debounce')
var watch = require('observ/watch')

module.exports = attach

function attach (Component, element) {
  var state = Component()

  var vtree = Component.render(state)
  var node = createElement(vtree)
  element.appendChild(node)

  watch(state, debounce(rerender))

  function rerender (state) {
    var tree = Component.render(state)
    var patches = diff(vtree, tree)
    node = patch(node, patches)
    vtree = tree
  }
}
