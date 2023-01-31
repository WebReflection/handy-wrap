'use strict';
/*! (c) Andrea Giammarchi - ISC */

const {iterator} = Symbol;

const handler = {
  get({_, $}, name, proxy) {
    switch (name) {
      case iterator: return $[iterator].bind($);
      case 'emit': return (type, ...args) => {
        for (let i = 0; i < $.length; i++)
          $[i].dispatchEvent(new Event(type, ...args));
        return proxy;
      };
      case 'length': return _ ? $.at(0)?.length : $.length;
      case 'valueOf': return () => _ ? $.at(0) : $;
      case 'on': name = 'addEventListener';
      default: {
        let value;
        for (let i = 0; i < $.length; i++) {
          if (i) value[i] = $[i][name];
          else {
            value = $[i][name];
            if (typeof value === 'function') return (...args) => {
              for (let i = 0; i < $.length; i++) $[i][name](...args);
              return proxy;
            };
            if (_) return value;
            value = [value];
          }
        }
        return value;
      }
    }
  },
  set({$}, name, value) {
    for (let i = 0; i < $.length; i++) $[i][name] = value;
    return true;
  }
};

const query = (target, name, parent = document) =>
  typeof target === 'string' ? parent[name](target) : target.valueOf();

/**
 * Proxy a single target
 * @param {EventTarget | string} target the single target to wrap
 * @param {Document | Element} [parent] the optional parent to query
 */
const $ = (target, parent) => new Proxy(
  {_: 1, $: [query(target, 'querySelector', parent)]},
  handler
);
exports.$ = $;

/**
 * Proxy a list of targets
 * @param {EventTarget[] | string} target the multiple targets to wrap
 * @param {Document | Element} [parent] the optional parent to query
 */
const $$ = (target, parent) => new Proxy(
  {_: 0, $: query(target, 'querySelectorAll', parent)},
  handler
);
exports.$$ = $$;
