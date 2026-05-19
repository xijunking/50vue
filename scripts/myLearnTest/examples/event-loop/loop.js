console.log('1,script start')

setTimeout(()=>{
    console.log('2,setTimeout')
},0)

const pre1 = new Promise((resolev,reject)=>{
    console.log('3.5,new Promise')
    resolev()
})

Promise.resolve(()=>{
    console.log('3,Promise')

}).then(()=>{
    console.log('4,Promise.then')
})

console.log('5,script end')
