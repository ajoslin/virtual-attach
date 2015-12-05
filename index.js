'use strict'

var createElement = require('virtual-dom/create-element')
var diff = require('virtual-dom/diff')
var patch = require('virtual-dom/patch')
var debounce = require('frame-debounce')
var createStore = require('weakmap-shim/create-store')

var Elements = createStore()

module.exports = attach

function attach (state, render) {
  var vtree = render(state())
  var element = createElement(vtree)
  var unlisten = state(debounce(rerender))

  Elements(element).unlisten = unlisten

  return element

  function rerender (state) {
    var tree = render(state)
    var patches = diff(vtree, tree)
    patch(element, patches)
    vtree = tree
  }
}

attach.unlisten = function unlisten (element) {
  var store = Elements(element)
  if (store && store.unlisten) {
    store.unlisten()
    delete store.unlisten
  }
}
