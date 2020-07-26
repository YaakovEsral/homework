window.app = window.app || {};

window.app.inc2 = (function(){
    'use strict';

    const incApp = {};
    incApp.totalCounters = 0;
    incApp.createCounter = function(){
        this.totalCounters++;

        let count = 0;
        const inc = {};
        inc.increment = function(){
            count++;
        };
        inc.getCount = function(){
            return count;
        };
        return inc;
    };

    return incApp;

}());

// const counter1 = window.app.inc2.createCounter();
// const counter2 = window.app.inc2.createCounter();
// const counter3 = window.app.inc2.createCounter();
// const counter4 = window.app.inc2.createCounter();

// for (let i = 0; i < 5; i++) {
//     counter1.increment();
// }

// for (let i = 0; i < 8; i++) {
//     counter2.increment();
// }

// for (let i = 0; i < 9; i++) {
//     counter3.increment();
// }

// for (let i = 0; i < 3; i++) {
//     counter4.increment();
// }

// console.log('total counters:', window.app.inc2.totalCounters);

// console.log('counter1.getCount()', counter1.getCount());
// console.log('counter2.getCount()', counter2.getCount());
// console.log('counter3.getCount()', counter3.getCount());
// console.log('counter4.getCount()', counter4.getCount());