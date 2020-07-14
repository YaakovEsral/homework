const du = (function dayUtils() {
    'use strict';
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Shabbos Kodesh'];

    function getDayName(index) {
        if (index <= 7 && index >= 1) {
            return days[index - 1];
        }
        else {
            return 'Invalid number. Please choose a number from 1 to 7.';
        }
    }

    function getDayNumber(dayName) {
        return days.findIndex(elem => elem.toLowerCase() === dayName.toLowerCase()) + 1;
    }    


    return {
        getDayName: getDayName,
        getDayNumber: getDayNumber
    };
}());

console.log('du.getDayNumber("Sunday")', du.getDayNumber('Sunday'));
console.log('du.getDayNumber("monday")', du.getDayNumber('monday'));
console.log('du.getDayName(3)', du.getDayName(3));
console.log('du.getDayName(10)', du.getDayName(10));


//////////////////

const ic = (function interestCalc(){
    'use strict';
    let years = 5;
    let rate = 0.05;

    function setYears(yrs){
        years = yrs;
    }

    function setRate(rt){
        rate = rt;
    }

    function calculate(principle){
        return (principle * rate) * years;
    }

    return {
        setYears: setYears,
        setRate: setRate,
        calculate: calculate
    };
}());

console.log('ic.calculate(100)', ic.calculate(100));
ic.setYears(10);
ic.setRate(0.10);
console.log('ic.calculate(200)', ic.calculate(200));

/*
Lab Qs:
How do you use the this.years in js like we did in java?
Go over arrow functions?
Restore files from git that I deleted?
*/

