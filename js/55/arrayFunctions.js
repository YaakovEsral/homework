'use strict';

//initial arrays and function

const letters = ['a', 'b', 'c', 'd', 'e', 'f'];

const upperLetters = ['A', 'B', 'C', 'D', 'D', 'F'];

//method to print an array
function printArray(array) {
    let result = '';
    for (let i = 0; i < array.length; i++) {
        result += array[i] + ' ';
    }
    console.log(result);
}

//printing our letter array
printArray(letters);

/////////////////////////
//1.
//homemade "every" function
function every(array, callback) {
    let result;
    for (let i = 0; i < array.length; i++) {
        result = callback(array[i]);
        if(callback(array[i]) === false){
            break;
        }
    }
    return result;
}

//from class
function every2(array, callback) {
    
    for (let i = 0; i < array.length; i++) {
        if(! callback(array[i])){
            //return false will break out of the function immediately
            //return once one fails the test, if nothing fails you can return true
            return false;
        }
    }
    return true;
}


//test homemade every with the below uppercase function
console.log('homemade every testing lowercase letters isUppercase. expected result: false', 
every(letters, isUppercase));

//function to check if a letter is uppercase
function isUppercase(elem) {
    return elem === elem.toUpperCase();
}

console.log('uppercase test', upperLetters.every(isUppercase));


//using built-in "every" function for uppercase
console.log('built-in uppercase', letters.every(isUppercase));

//function to check if a letter is lowercase
function isLowercase(elem) {
    //more concise:
    return elem === elem.toLowerCase();
    
    //original method:
    // let result = false;
    // if (elem === elem.toLowerCase()) {
    //     result = true;
    // }
    // return result;
}

//using built-in "every" function for lowercase
console.log('built-in lowercase', letters.every(isLowercase));

////////////////////////////////////
//2
//homemade "some" function

function some(array, callback){
    let result;
    for (let i = 0; i < array.length; i++) {
        result = callback(array[i]);
        if(callback(array[i]) === true){
            break;
        }
    }
    return result;
}

const mixedLetters = ['A', 'b', 'C', 'd', 'e', 'F'];
printArray(mixedLetters);
console.log('testing some on above array, expected result-true', some(mixedLetters, isUppercase));
console.log('testing some on above array, expected result-true', some(mixedLetters, isLowercase));

//3
//perform an action only on those items in the array that pass the test

function onlyIf(array, test, action){
    for (let i = 0; i < array.length; i++) {
        if (test(array[i]) === true){
            action(array[i]);
        }
    }
}

//add a dollar sign to an element (will be used in onlyIf function as the 'action')
function addDollarSign(elem){
    elem += '$';
    // elem = elem.concat('$');
    //  elem.concat('$');
}

let a = 'a';
addDollarSign(a);
console.log('test concat', a);


function addPercentSign(elem){
    elem += '%';
}

function print(elem){
    console.log(elem);
}

//will create a new function of mixed letters. will then pass this function into onlyIf.
//expected result: all lowercase letters will have a dollar sign added.

let mixedLetters2 = ['A', 'b', 'C', 'd', 'e', 'F'];
console.log('initial array:');
printArray(mixedLetters2);

onlyIf(mixedLetters2, isLowercase, print);
// printArray(mixedLetters2);
// onlyIf(mixedLetters2, isLowercase, addDollarSign);

//current status: doesn't seem to be working to pass in the string parameters
//therefore I just used a print(aka console.log) function as the action

//4
//use array.filter and array.forEach to accomplish the results of #3

console.log('#4: filtering and printing all lowercase letters:');

const filteredLowercase = mixedLetters2.filter(isLowercase);
filteredLowercase.forEach(print);