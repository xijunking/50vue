# closure 知识点速记

## 1. 什么是闭包

闭包可以先简单记成：

- 一个函数
- 访问了外层作用域的变量
- 外层函数执行结束后，这个变量仍然能被内部函数访问

示例：

```js
function outer() {
    let a = 99;
    return function () {
        console.log(a);
    };
}

const fn = outer();
fn();
```

上面这个例子里，返回的内部函数用到了 `outer` 里的 `a`，这就是闭包。

补充：

- 普通参数传值不算闭包
- “返回函数”不一定是闭包
- 关键要看内部函数有没有引用外部变量

## 2. 闭包的作用

常见作用：

- 保存状态
- 实现简单的私有变量
- 让回调函数记住创建时的外部变量

示例：

```js
function createCounter() {
    let count = 0;
    return function () {
        count++;
        console.log(count);
    };
}

const add = createCounter();
add(); // 1
add(); // 2
```

这里 `count` 会一直被保存下来。

## 3. 闭包可能带来的问题

- 如果引用了大对象，可能增加内存占用
- 循环和异步一起使用时，容易拿错变量
- 代码多了以后，可读性会下降

经典例子：

```js
for (var i = 0; i < 3; i++) {
    setTimeout(function () {
        console.log(i);
    }, 100);
}
```

这里通常会输出 `3 3 3`，因为它们拿到的是同一个 `i`。

## 4. 什么是柯里化

柯里化可以理解成：

把一个接收多个参数的函数，拆成多个接收单个参数的函数。

示例：

```js
function add(a) {
    return function (b) {
        return function (c) {
            return a + b + c;
        };
    };
}

add(1)(2)(3);
```

更实用的理解：

- 先固定一部分参数
- 返回一个更专用的新函数

例如：

```js
function makeAdder(a) {
    return function (b) {
        return a + b;
    };
}

const add5 = makeAdder(5);
console.log(add5(3)); // 8
```

柯里化经常会用到闭包，因为它要“记住”前面传进来的参数。

## 5. 类型判断

### `typeof`

适合判断这些基础类型：

```js
typeof "abc"        // "string"
typeof 123          // "number"
typeof true         // "boolean"
typeof undefined    // "undefined"
typeof function(){} // "function"
typeof Symbol()     // "symbol"
typeof 10n          // "bigint"
```

但它有局限：

```js
typeof null // "object"
typeof []   // "object"
typeof {}   // "object"
```

所以 `typeof` 不适合精确区分数组、对象、`null`。

### `Object.prototype.toString.call(value)`

这个方法可以更精确地判断类型：

```js
Object.prototype.toString.call([])        // "[object Array]"
Object.prototype.toString.call({})        // "[object Object]"
Object.prototype.toString.call(null)      // "[object Null]"
Object.prototype.toString.call(undefined) // "[object Undefined]"
Object.prototype.toString.call(new Date()) // "[object Date]"
```

建议记法：

- 判断基础类型：`typeof`
- 判断数组：`Array.isArray()`
- 精确区分对象类型：`Object.prototype.toString.call()`

## 6. 为什么这里要加 `call`

`Object.prototype.toString` 这个方法执行时，需要知道 `this` 是谁。

写成：

```js
Object.prototype.toString.call(value)
```

意思就是：

- 调用 `toString`
- 并且把它里面的 `this` 指向 `value`

这样它才能检查 `value` 的真实类型。

## 7. `call`、`apply`、`bind` 的区别

它们的核心作用都是：

- 改变函数执行时的 `this`

### `call`

立即调用，参数一个个传：

```js
fn.call(obj, a, b);
```

### `apply`

立即调用，参数放数组里：

```js
fn.apply(obj, [a, b]);
```

### `bind`

不会立即调用，而是返回一个新函数：

```js
const newFn = fn.bind(obj, a, b);
newFn();
```

速记：

- `call`：立即调用，参数分开写
- `apply`：立即调用，参数用数组
- `bind`：先绑定，后调用

## 8. JS 数据类型

### 基本数据类型

一共 7 个：

- `string`
- `number`
- `boolean`
- `undefined`
- `null`
- `symbol`
- `bigint`

### 引用类型

常见的有：

- `Object`
- `Array`
- `Function`
- `Date`
- `RegExp`
- `Map`
- `Set`

平时也可以简单记成：

- 基本类型
- 对象类型

## 9. 一份简单速记

- 闭包：函数记住外层变量
- 柯里化：分步传参，常借助闭包
- `typeof`：适合判断基础类型
- `Array.isArray()`：判断数组
- `Object.prototype.toString.call()`：精确判断对象类型
- `call/apply`：立即调用
- `bind`：返回新函数，不立即执行
