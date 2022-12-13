const firstObject = {
    foo: 1,
    bar: 2
}

const secondObject = firstObject;

const myPrimitive = firstObject.foo;

console.log(secondObject);
console.log(myPrimitive);

firstObject.foo = 3;

console.log(secondObject);
console.log(myPrimitive);