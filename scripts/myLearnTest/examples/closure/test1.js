//闭包

const fun1 = (a) => {
    console.log(a);
}

const fun2 = ()=>{
    var a = 99;
    return function(){
        fun1(a);
    }
}

fun2()();


const isArray = (value)=>{
    return Object.prototype.toString.call(value) === '[object Array]';  
}

console.log(isArray([]));
console.log(`${isArray([])}`);

const isObject = (value)=>{
    return Object.prototype.toString.call(value) === '[object Object]';
}


const isType = (type)=>{
    return (value)=>{
        return Object.prototype.toString.call(value) === `[object ${type}]`;
    };
}

const newIsArray = isType('Array');
const newIsObject = isType('Object');

console.log(newIsArray([]));
console.log(newIsObject({}));