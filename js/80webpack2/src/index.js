import $ from 'jquery';
import './css/style.css';
import logoImg from './media/logo.png';
import json from './data.json5';

$('#theButton').on('click', () =>{
    $('body').css('backgroundColor', `rgb(${randomRgb()}, ${randomRgb()}, ${randomRgb()})`);
});

const logo = new Image();
logo.src = logoImg;
$('p').append(logo);

console.log(`My name is ${json.name}, and my occupation is ${json.occupation}`);

function randomRgb(){
    return Math.floor( (Math.random() * 255) + 1);
}

import theDefault from './imports';
import {helloWorld} from './imports';

theDefault();
helloWorld();

// console.log(x);
// hello();