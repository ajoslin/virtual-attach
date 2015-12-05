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

var data = attach(Component(), Component.render)

data.element; // dom element that will be updated when state changes
data.unlisten; // call to remove listener for state changes

```

## API

#### `var data = attach(state, render)`

Returns a `data` object, containing `data.element`, a DOM element, and `data.unlisten`, an unlisten function.

##### state

An observable state

##### render

A render function that takes in a state object and returns a virtual DOM tree. Render will be called with the observable state whenever the state changes.

## License

MIT © [Andrew Joslin](http://ajoslin.com)
