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

attach(Component, document.body)
// Component will be attached and updated whenever its state changes
```

## API

#### `attach(Component, element)`

##### Component

A virtual DOM component constructor

##### element

A DOM element to attach the component to

## License

MIT © [Andrew Joslin](http://ajoslin.com)
