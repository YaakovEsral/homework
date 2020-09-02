window.pcs = function (id) {
    'use strict';

    function get(id) {
        return document.getElementById(id);
    }

    function setCss(element, property, value) {
        element.style[property] = value;
    }

    function getCss(element, property) {
        // return element.style[property]; //returns color name
        return getComputedStyle(element)[property]; //returns rgb
    }



    const theElem = get(id);

    // return function(property, value){
    //     setCss(theElem, property, value);
    // };

    return {
        // setCss: (property, value) => setCss(theElem, property, value),
        // getCss: property => getCss(theElem, property), 
        css: function (property, value) {
            if (arguments < 2) {
                return getCss(theElem, property);
            }
            setCss(theElem, property, value);
            return this;
        },
        click: function (callback) {
            theElem.addEventListener('click', callback);
            return this;
        },
        hide: function () {
            setCss(theElem, 'display', 'none');
            return this;
        },
        show: function () {
            setCss(theElem, 'display', 'block');
            return this;
        },
        changeColors: function(duration, interval = 1000){
            function changeColors(){
                const r = Math.floor(Math.random() * 256);
                const g = Math.floor(Math.random() * 256);
                const b = Math.floor(Math.random() * 256);
                setCss(theElem, 'color', `rgb(${r},${g},${b} )`);
            }
            const intId = setInterval(changeColors, interval);
            setTimeout(() => clearInterval(intId), duration);
        }
    };
};