var myApp = myApp || {};

myApp.days = (function (app) {
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



    app.getDayName = getDayName;
    app.getDayNumber = getDayNumber;



    return app;
}(myApp.days || {}));