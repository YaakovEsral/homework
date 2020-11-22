"use strict";

/*global email*/ 

console.log('Name: ', name, '\n', 'Email: ', email);

let age = prompt('What is your age?', '40');

alert(`Hello ${name}, ${age} is pretty old!`);

if(age>=21){
    alert('So are you starting shidduchim?');
}

confirm('Do you really want to start?');