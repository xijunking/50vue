

// 同步
console.log('1. 同步代码')

// 宏任务
setTimeout(() => {
    console.log('2. settime')
}, 0)


// 微任务
const pre1 = new Promise((resolve, reject) => {
    console.log('3. new Promise') //属于同步
    resolve('true');
})

// 微任务 异步执行
pre1.then((resolveValue) => {
    console.log('4. Promise.then', resolveValue)
})


const fun1 = () => {
    console.log('5. fun1')
    setTimeout(() => {
        console.log('6. setTimeout')
    }, 0)
}

// 微任务 第二个
Promise.resolve(()=>{
    
}).then(()=>{
    console.log('8. Promise.resolve')
    setTimeout(()=>{
        console.log('9. setTimeout')
    },0)
})

pre1.then(() => {
    console.log('7. Promise.then', 'false')
})

// 同步
fun1()

