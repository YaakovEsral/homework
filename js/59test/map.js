(function (){
    'use strict';
    function map(array, callbackfn) {
        let newArray = [];
        for (let i = 0; i < array.length; i++) {
            newArray[i] = callbackfn(array[i]);
        }
        return newArray;
    }

    function double(num){
        return num * 2;
    }

    const numbers = [2,4,6];

    const doubledNumbers = map(numbers, double);

    console.log('original numbers', numbers);

    console.log('doubled numbers', doubledNumbers);


}());