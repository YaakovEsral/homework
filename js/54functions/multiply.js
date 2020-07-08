'use strict'


console.log(multiply(9, 8));

function multiply(x, y){
    return x * y;
}

console.log(multiply(2,3));

console.log(multiply(32, 45));

function returnMultiply(){
    return function(x, y){
        return x*y;
    };
}

const betterMultiply = returnMultiply();
console.log(betterMultiply(6,7));

function lastReturnMultiply(x){
    return function(y){
        return x*y;
    };
}

// const bestMultiply = lastReturnMultiply();
// bestMultiply(4);

const multiplyFive = lastReturnMultiply(5);
console.log(multiplyFive(20));