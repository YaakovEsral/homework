import $ from 'jquery';

export function helloWorld() {
    console.log('Hello World!');
}

export default function sayHello(){
    console.log('The default say hello');
}

$('body').append('<p>Last paragraph from imports</p>');