type Wrap<T> = EventTarget & {
  [P in keyof T]?: T[P];
} & {
  emit(type:string, options?:object):Wrap<T>;
  on(type:string, handler:function|EventListener, options?:object):Wrap<T>;
  valueOf():T;
};

/**
 * Exposes handy utilities to a single `Element`.
 * @param css the *CSS* selector to query.
 */
declare function $(css: string): Wrap<Element>;

/**
 * Exposes handy utilities to a single `Element`.
 * @param css the *CSS* selector to query.
 * @param parent the `parentNode` to query.
 */
declare function $(css: string, parent: Document | Element):Wrap<Element>;

/**
 * Exposes handy utilities to a single `EventTarget` entry.
 * @param target the signle `EventTarget` entry to wrap.
 */
declare function $<T>(target: T):Wrap<T>;

/**
 * Exposes handy utilities to a list of `EventTarget` entries.
 * @param css the *CSS* selector to query all.
 */
declare function $$(css: string):Wrap<NodeList>;

/**
 * Exposes handy utilities to a list of `EventTarget` entries.
 * @param css the *CSS* selector to query all.
 * @param parent the `parentNode` to query.
 */
declare function $$(css: string, parent: Document | Element):Wrap<NodeList>;


/**
 * Exposes handy utilities to a list of `EventTarget` entries.
 * @param target the list of `EventTarget` entries to wrap.
 */
declare function $$<T>(target: T):Wrap<T>;

export {$, $$};
