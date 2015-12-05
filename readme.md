# virtual-attach [![Build Status](https://travis-ci.org/ajoslin/virtual-attach.svg?branch=master)](https://travis-ci.org/ajoslin/virtual-attach)

> Attach a virtual dom element to the DOM and sync changes


## Install

```
$ npm install --save virtual-attach
```


## Usage

```js
var attach = require('virtual-attach')
var Struct = require('observ-struct')
var h = require('virtual-dom/h')

function Component () {
  return Struct({
    foo: 'bar'
  })
}

Component.render = function render (state) {
  return h('div', state.foo)
}

// dom element whose contents match the vtree returned from component.render,
// which will be updated when state changes
var element = attach(Component(), Component.render)
```

## API

#### `var element = attach(state, render)`

Returns a DOM element matching the vtree returned from `render` when called with `state`.

##### state

An observable state

##### render

A render function that takes in a state object and returns a virtual DOM tree. Render will be called with the observable state whenever the state changes.

#### `attach.unlisten(element)`

When called with an element returned from `attach`, will stop listening for changes to `state`.

## License

MIT © [Andrew Joslin](http://ajoslin.com)
