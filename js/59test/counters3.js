// SL - 97 nice!
(function(){
    'use strict';

    for (let i = 0; i < 10; i++) {
        window.app.inc1.increment();
    }

    const incrementer2 = window.app.inc2.createCounter();
    const incrementer3 = window.app.inc2.createCounter();

    for (let i = 0; i < 5; i++) {
        incrementer2.increment();
    }

    for (let i = 0; i < 15; i++) {
        incrementer3.increment();
    }

    console.log('first one:', window.app.inc1.getCount());
    console.log('second one:', incrementer2.getCount());
    console.log('third one:', incrementer3.getCount());

}());