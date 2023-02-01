/*! (c) Andrea Giammarchi - ISC */

const {iterator} = Symbol;

export const plugins = new Map;

const valueOf = (_, $) => _ ? $.at(0) : $;

const handler = {
  get({_, $}, name, proxy) {
    if (plugins.has(name))
      return plugins.get(name)(valueOf(_, $), name, proxy);
    switch (name) {
      case iterator: return $[iterator].bind($);
      case 'emit': return (type, ...args) => {
        for (let i = 0; i < $.length; i++)
          $[i].dispatchEvent(new Event(type, ...args));
        return proxy;
      };
      case 'length': return valueOf(_, $)?.length;
      case 'valueOf': return () => valueOf(_, $);
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

const query = (target, name, parent = globalThis.document) =>
  typeof target === 'string' ? parent[name](target) : target.valueOf();

export const $ = (target, parent) => new Proxy(
  {_: 1, $: [query(target, 'querySelector', parent)]},
  handler
);

export const $$ = (target, parent) => new Proxy(
  {_: 0, $: query(target, 'querySelectorAll', parent)},
  handler
);
