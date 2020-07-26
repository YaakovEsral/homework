window.app = window.app || {};

window.app.inc1 = (function (){
    'use strict';
    
    const inc = {};
    let count = 0;
    inc.increment = function(){
        count++;
    };

    inc.getCount = function(){
        return count;
    };

    return inc;

}());

// console.log(window.app.inc1.getCount());