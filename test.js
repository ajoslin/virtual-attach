'use strict'

var test = require('tape')
var h = require('virtual-dom/h')
var Struct = require('observ-struct')
var Observ = require('observ')
var partial = require('ap').partial
var proxyquire = require('proxyquire')

var attach = proxyquire('./', {
  // frame-debounce effectively does nothing
  'frame-debounce': partial
})

test('re-render on change and unlisten when called', function (t) {
  var state = Component()
  var element = attach(state, Component.render)

  t.equal(element.className, 'initial')

  state.value.set('new value')
  t.equal(element.className, 'new value')

  attach.unlisten(element)
  state.value.set('last value')
  t.equal(element.className, 'new value', 'unlisten was called, no update')

  t.end()
})

function Component () {
  return Struct({
    value: Observ('initial')
  })
}

Component.render = function render (state) {
  return h('div', {className: state.value})
}
