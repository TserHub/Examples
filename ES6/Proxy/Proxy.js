/**
 * ES6 原生提供 Proxy 构造函数，用来生成 Proxy 实例。
 * target参数表示所要拦截的目标对象
 * handler参数也是一个对象，用来定制拦截行为。
 */
// var proxy = new Proxy(target, handler);

let proxy = new Proxy({ test: 'hhh' }, {
  get: function (target, key, receiver) {
    console.log('%c-------get--------', 'color: red;');
    console.log('target:', target);
    console.log('key:', key);
    console.log('receiver:', receiver);
    return Reflect.get(target, key, receiver);
  },
  set: function (target, key, value, receiver) {
    console.log('%c-------set--------', 'color: red;');
    console.log('target:', target);
    console.log('key:', key);
    console.log('value:', value);
    console.log('receiver:', receiver);
    return Reflect.set(target, key, value, receiver);
  }
});

console.log('%cproxy:', 'color:blue;', proxy);

proxy.count = 1;

console.log('%cproxy:', 'color:blue;', proxy);

++proxy.count;

console.log('%cproxy:', 'color:blue;', proxy);
