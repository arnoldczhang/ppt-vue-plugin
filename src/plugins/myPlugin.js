const factory = {};
factory.install = (Vue, options) => {
  const noop = v => v;
  const searchMap = new Map();

  const search = {
    bind(inst) {
      searchMap.set(inst, new Map());
    },
    unbind(inst) {
      searchMap.delete(inst);
    },
  };

  const nextTick = (vnode, promise) => {
    vnode.isPending = true;
    promise.then((res) => {
      const nextFunc = vnode.nextFunc;
      vnode.nextFunc = null;
      if (typeof nextFunc === 'function') {
        return nextTick(vnode, nextFunc());
      }
      vnode.isPending = false;
      return res;
    });
  };

  const inputEvent = function inputEvent(ctx, vnode, func = noop) {
    if (this.value === vnode.beforeSearchValue) return;
    vnode.beforeSearchValue = this.value;
    if (vnode.isPending) {
      vnode.nextFunc = func.bind(ctx, this.value);
      return;
    }

    if (typeof func === 'function') {
      const promise = func.call(ctx, this.value);
      if (promise && typeof promise.then === 'function') {
        nextTick(vnode, promise);
      }
    }
  };

  const compositionStartEvent = (vnode) => {
    vnode.isPending = true;
  };

  const compositionEndEvent = (el, ctx, vnode) => {
    const thisMap = searchMap.get(ctx);
    vnode.isPending = false;
    thisMap.get(el).inputEvent();
  };

  const bindFunc = (el, binding, vnode) => {
    console.log('%cbind', 'color: green');
    const searchFunc = binding.value;
    const ctx = vnode.context;
    const thisMap = searchMap.get(ctx);
    const eventMap = {
      inputEvent: inputEvent.bind(el, ctx, vnode, searchFunc),
      compositionStartEvent: compositionStartEvent.bind(this, vnode),
      compositionEndEvent: compositionEndEvent.bind(this, el, ctx, vnode),
    };
    thisMap.set(el, eventMap);
    el.addEventListener('input', eventMap.inputEvent, false);
    el.addEventListener('compositionstart', eventMap.compositionStartEvent, false);
    el.addEventListener('compositionend', eventMap.compositionEndEvent, false);
    // debugger;
  };

  const unbindFunc = (el, binding, vnode) => {
    console.log('%cunbind', 'color: green');
    const ctx = vnode.context;
    const thisMap = searchMap.get(ctx);
    const eventMap = thisMap.get(el);
    el.removeEventListener('input', eventMap.inputEvent);
    el.removeEventListener('compositionstart', eventMap.compositionStartEvent);
    el.removeEventListener('compositionend', eventMap.compositionEndEvent);
    thisMap.delete(el);
    // debugger;
  };

  Vue.directive('search', {
    bind: bindFunc,
    unbind: unbindFunc,
  });

  Vue.prototype.$search = search;
  Vue.search = search;
};

export default factory;
