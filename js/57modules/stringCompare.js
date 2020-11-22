var myApp = myApp || {}; //creating an object called myApp, which is a global.
//if myApp was already created by a different file, use the created version.
//Otherwise, create a new empty object

myApp.strings = (function (strings){ //creating an object called strings inside myApp
    'use strict';

    strings.stringCaseInsensitiveCompare = function(str1, str2){
        return str1.toLowerCase() === str2.toLowerCase();
    };

    return strings; //returning the strings object after it has been modified
}(myApp.strings || {})); 
//if within myApp, an object called strings was already created by a different file,
//use the created version (i.e. pass it into as the function parameter).
//Otherwise, create a new empty object to become myApp.strings