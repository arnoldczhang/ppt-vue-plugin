/*
'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured'
 */
const factory = {};
factory.install = (Vue, options) => {
  const noop = v => v;
  const searchMap = new Map();

  const search = {
    register(inst) {
      searchMap.set(inst, new Map());
    },
    unregister(inst) {
      searchMap.delete(inst);
    },
  };

  const nextTick = (vnode, promise) => {
    vnode.isPending = true;
    promise.then((res) => {
      const nextFunc = vnode.nextFunc;
      if (typeof nextFunc === 'function') {
        vnode.nextFunc = null;
        return nextTick(vnode, nextFunc());
      }
      vnode.isPending = false;
      return res;
    }, (err) => {
      console.log(err.message);
      vnode.isPending = false;
    });
  };

  const inputEvent = function inputEvent(ctx, vnode, func = noop) {
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
    console.log('bindFunc');
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
  };

  const unbindFunc = (el, binding, vnode) => {
    const ctx = vnode.context;
    const thisMap = searchMap.get(ctx);
    const eventMap = thisMap.get(el);
    el.removeEventListener('input', eventMap.inputEvent);
    el.removeEventListener('compositionstart', eventMap.compositionStartEvent);
    el.removeEventListener('compositionend', eventMap.compositionEndEvent);
    thisMap.delete(el);
  };

  Vue.directive('search', {
    bind: bindFunc,
    unbind: unbindFunc,
  });

  Vue.prototype.$search = search;
  Vue.search = search;
};

export default factory;
