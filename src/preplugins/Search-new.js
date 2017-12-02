const factory = (Vue, options) => {
  const store = new Map();

  const promisify = (el, vnode, func) => {
    const promise = new Promise((resolve, reject) => {
      vnode.isPending = true;
      if (typeof vnode === 'function') {
        func = vnode;
        vnode = el;
        return func(resolve, reject);
      }
      func(el.value, resolve, reject);
    });

    const callback = () => {
      vnode.isPending = false;
      if (typeof vnode.nextTick === 'function') {
        promisify(vnode, vnode.nextTick);
        vnode.nextTick = null;
      }
    };
    promise.then(callback).catch(callback);
  };

  const inputFunc = (el, vnode, func) => {
    if (vnode.isPending) {
      vnode.nextTick = func.bind(vnode.context, el.value);
      return;
    }

    if (vnode.promise) {
      return promisify(el, vnode, func);
    }
    func(el, vnode, func);
  };

  const compositionstartFunc = (vnode) => {
    vnode.isPending = true;
  };

  const compositionendFunc = (el, vnode) => {
    const instMap = store.get(vnode.context);
    const thisMap = instMap.get(el);
    vnode.isPending = false;
    thisMap.inputFunc();
  };

  const removeEvent = (map, el) => {
    el.removeEventListener('input', map.inputFunc);
    el.removeEventListener('compositionstart', map.compositionstartFunc);
    el.removeEventListener('compositionend', map.compositionendFunc);
  };

  const bindFunc = (el, bindings, vnode) => {
    const modifiers = bindings.modifiers;
    const func = bindings.value;
    const instMap = store.get(vnode.context);
    const thisMap = {
      inputFunc: inputFunc.bind(this, el, vnode, func),
      compositionstartFunc: compositionstartFunc.bind(this, vnode),
      compositionendFunc: compositionendFunc.bind(this, el, vnode),
    };

    vnode.promise = modifiers.promise;
    instMap.set(el, thisMap);

    el.addEventListener('input', thisMap.inputFunc, false);
    el.addEventListener('compositionstart', thisMap.compositionstartFunc, false);
    el.addEventListener('compositionend', thisMap.compositionendFunc, false);
  };

  const unbindFunc = (el, bindings, vnode) => {
    const instMap = store.get(vnode.context);
    const thisMap = instMap.get(el);
    removeEvent(thisMap, el);
  };

  Vue.directive('search', {
    bind: bindFunc,
    unbind: unbindFunc,
  });

  Vue.prototype.$search = {
    register(inst) {
      store.set(inst, new Map());
    },
    unregister(inst) {
      const instMap = store.get(inst);
      if (instMap) {
        instMap.forEach(removeEvent);
      }
      store.delete(inst);
    },
  };

  Vue.mixin({
    created() {
      this.$search.register(this);
    },
    destroyed() {
      this.$search.unregister(this);
    },
  });
};

export default factory;
