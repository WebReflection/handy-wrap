# handy-wrap

[![build status](https://github.com/WebReflection/handy-wrap/actions/workflows/node.js.yml/badge.svg)](https://github.com/WebReflection/handy-wrap/actions) [![Coverage Status](https://coveralls.io/repos/github/WebReflection/handy-wrap/badge.svg?branch=main)](https://coveralls.io/github/WebReflection/handy-wrap?branch=main)

A generic `EventTarget` Proxy wrapper to chain and/or group common operations, used to showcase [this blog post](https://webreflection.medium.com/taming-the-web-speech-api-ef64f5a245e1) code.

### Single
  * `$('css'[, parent])` to query the document and handle a single reference
  * `$(target)` to wrap directly an *EventTarget* implemented interface
  * `$(t).on(type, ...rest)` to add a listener and chain the proxy
  * `$(t).emit(type, ...rest)` to dispatch an event and chain the proxy
  * `$(t).field` to get the field value
  * `$(t).field = value` to set a field value
  * `$(t).method(...args)` to invoke a (bound) method and chain the proxy
  * `$(t).valueOf()` to retrieve the wrapped reference

### List
  * `$$('css'[, parent])` to query the document and handle a list of references
  * `$$([target1, target2, ...targetN])` to wrap directly more *EventTarget* implemented interfaces
  * `$$([...t]).on(type, ...rest)` to add a listener to all targets and chain the proxy
  * `$$([...t]).emit(type, ...rest)` to dispatch many events and chain the proxy
  * `$$([...t]).field` to get all fields values as array
  * `$$([...t]).field = value` to set all fields values
  * `$$([...t]).method(...args)` to invoke all (bound) methods and chain the proxy
  * `$$([...t]).valueOf()` to retrieve the list of references
  * `$$([...t]).length` to retrieve the `length` of the list
