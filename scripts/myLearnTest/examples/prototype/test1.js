// 原型链：
// 1. 访问属性/方法时，先找对象自己，再沿 [[Prototype]] 向上找
// 2. 这条查找链就是原型链：arr -> Array.prototype -> Object.prototype -> null
// 3. “继承”本质是对象可以沿原型链拿到上层能力
// 4. “共享方法”本质是多个实例共用原型上的同一份方法
// 5. JSON.stringify() 只序列化“可枚举的自有属性”，看不到原型上大多数方法

const arr = [1, 2];
const arrProto = Object.getPrototypeOf(arr);

console.log(arrProto === Array.prototype); // true
console.log(Object.getOwnPropertyNames(arrProto)); // 原型上实际拥有的方法名