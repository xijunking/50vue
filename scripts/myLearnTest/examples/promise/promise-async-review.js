console.log('例子开始')

// 宏任务：计时器回调会进入下一轮事件循环
setTimeout(() => {
  console.log('6. setTimeout 宏任务')
}, 0)

// Promise 构造函数里的 executor 会立刻同步执行
const promiseFromConstructor = new Promise((resolve) => {
  console.log('2. new Promise executor（同步）')
  resolve('构造函数里的结果')
})

// then 回调属于微任务，要等同步代码结束后才执行
promiseFromConstructor.then((value) => {
  console.log('5. promise.then 微任务 ->', value)
})

// Promise.resolve(普通值) 会立刻得到一个已完成的 Promise
Promise.resolve('Promise.resolve 的结果').then((value) => {
  console.log('7. Promise.resolve().then 微任务 ->', value)
})

async function runAsyncExample() {
  console.log('3. async 函数开始（同步部分）')

  // await 后面的代码不会立刻继续，而是放到微任务里续执行
  const result = await Promise.resolve('await 等到的结果')

  console.log('8. await 之后的代码（微任务）->', result)
}

runAsyncExample()

// 普通函数调用就是最普通的同步执行
function normalFunction() {
  console.log('4. 普通函数调用（同步）')
}

normalFunction()

console.log('1. 顶层同步代码')
console.log('例子结束')

/*
预期输出顺序大致如下：

例子开始
2. new Promise executor（同步）
3. async 函数开始（同步部分）
4. 普通函数调用（同步）
1. 顶层同步代码
例子结束
5. promise.then 微任务 -> 构造函数里的结果
7. Promise.resolve().then 微任务 -> Promise.resolve 的结果
8. await 之后的代码（微任务）-> await 等到的结果
6. setTimeout 宏任务

复习口诀：
1. 同步代码先执行
2. Promise.then 和 await 后续代码属于微任务
3. setTimeout 属于宏任务
4. new Promise 里的 executor 是同步执行，不是微任务
*/
