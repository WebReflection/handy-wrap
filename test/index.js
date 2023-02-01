import {$, $$, plugins} from '../esm/index.js';
const assert = (current, expected) => {
  if (current !== expected) {
    console.error('got', current, 'expected', expected);
    process.exit(1);
  }
};

class ET extends EventTarget {
  constructor() {
    super().test = Math.random();
    this.length = -1;
  }
}

globalThis.document = {
  querySelector: () => new ET,
  querySelectorAll: () => [new ET, new ET]
};

const o = $('object').on('test', Object);
const oo = $$('object').on('test', Object);

assert($(o).valueOf(), o.valueOf());
assert($$(oo).valueOf(), oo.valueOf());

o.emit('test');
oo.emit('test');

assert([o.test].join('') !== oo.test.join(''), true);

o.test = 1;
oo.test = 2;
assert(o.test, 1);
assert([...oo][0].test, 2);
assert(o.length, -1);
assert(oo.length, 2);

delete globalThis.document;

plugins.set('random', (value, name, proxy) => {
  assert(value, Array);
  assert(name, 'random');
  assert(proxy.valueOf(), value);
  return Math.random();
});

assert(typeof $(Array).random, 'number');
