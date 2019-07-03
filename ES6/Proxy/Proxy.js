/**
 * ES6 原生提供 Proxy 构造函数，用来生成 Proxy 实例。
 * target参数表示所要拦截的目标对象
 * handler参数也是一个对象，用来定制拦截行为。
 * get(target, propKey, receiver)：拦截对象属性的读取
 * set(target, propKey, value, receiver)：拦截对象属性的设置
 */

/*
let target = {};
let handler = {
  // target: 目标对象, property: 所要访问的属性
  get: (target, property, receiver) => { },
  // value: 设置的属性值
  set: (target, property, value, receiver) => { },
};
let proxy = new Proxy(target, handler);
*/

const divider = () => {
  console.log('------------///------------');
};

{
  let target = { whoami: 'target' };
  let proxy = new Proxy(target, {

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
  console.log('%ctarget:', 'color: blue;', target);

  ++proxy.count;

  console.log('%cproxy:', 'color:blue;', proxy);
  console.log('%ctarget:', 'color: blue;', target);

  divider();
}

/**
 * 注意，要使得Proxy起作用，必须针对Proxy实例进行操作，而不是针对目标对象（上例是空对象）进行操作。
 */
// 如果handler没有设置任何拦截，那就等同于直接通向原对象。
{
  let target = {};
  let handler = {};
  let proxy = new Proxy(target, handler);

  proxy.a = 'b';
  console.log('target.a = ', target.a);

  divider();
}

/**
 * Proxy 实例也可以作为其他对象的原型对象。
 */
{
  var proxy = new Proxy({}, {
    get: function (target, property) {
      return 35;
    }
  });

  let obj = Object.create(proxy);

  console.log('obj:', obj);
  console.log(obj.time); // 35

  divider();
}

/**
 * 同一个拦截器函数，可以设置拦截多个操作。
 * apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作
 * construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作
 */
{
  let handler = {
    get: function (target, name) {
      console.log('%cget:', 'color: red;');
      console.log('%ctarget:', 'color: blue;', target);
      console.log('%cname:', 'color: blue;', name);
      if (name === 'prototype') {
        return Object.prototype;
      }
      return 'Hello, ' + name;
    },

    apply: function (target, thisBinding, args) {
      console.log('%capply:', 'color: red;');
      console.log('%ctarget:', 'color: blue;', target);
      console.log('%cthisBinding:', 'color: blue;', thisBinding);
      console.log('%cargs:', 'color: blue;', args);
      return args[0];
    },

    construct: function (target, args) {
      console.log('%cconstruct:', 'color: red;');
      console.log('%ctarget:', 'color: blue;', target);
      console.log('%cargs:', 'color: blue;', args);
      return { value: args[1] };
    }
  };

  let fproxy = new Proxy(function (x, y) {
    return x + y;
  }, handler);

  console.log('%cfproxy:', 'color: blue;', fproxy);
  console.log('~~~~~~~~~~~~~~~~~~~~~');

  {
    let result = fproxy(1, 2);
    console.log('result:', result); // 1
    console.log('~~~~~~~~~~~~~~~~~~~~~');
  }

  {
    let result = new fproxy(1, 2);
    console.log('result:', result); // {value: 2}
    console.log('~~~~~~~~~~~~~~~~~~~~~');
  }

  {
    let result = fproxy.prototype === Object.prototype;
    console.log('result:', result); // true
    console.log('~~~~~~~~~~~~~~~~~~~~~');
  }

  {
    let result = fproxy.foo === "Hello, foo";
    console.log('result:', result); // true
  }

  divider();
}
