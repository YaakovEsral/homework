(function () {
    'use strict';

    const colors = ['red', 'yellow', 'green', 'blue', 'orange', 'teal'];

    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    const defaultButton = document.getElementById('default');

    const redBtn = document.getElementById('redBtn');
    const greenBtn = document.getElementById('greenBtn');
    const blueBtn = document.getElementById('blueBtn');

    let colorNumber = 0;
    let intervalId;

    let redVar = 100;
    let greenVar = 100;
    let blueVar = 100;

    
    //listeners for main buttons

    startButton.addEventListener('click', () => {
        endInterval();
        randomColors();
        intervalId = setInterval(randomColors, 1000);
        startButton.disabled = true;
    });
    stopButton.addEventListener('click', () => {
        endInterval();
        startButton.disabled = false;
    });

    defaultButton.addEventListener('click', () =>{
        endInterval();
        document.body.style.backgroundColor = 'white';
    });

    //clear interval function
    function endInterval(){
        clearInterval(intervalId);
    }

    //listeners for red, green, and blue buttons
    redBtn.addEventListener('click', () =>{
        endInterval();
        redGradual();
        intervalId = setInterval(redGradual, 100);
    });

    greenBtn.addEventListener('click', () =>{
        endInterval();
        greenGradual();
        intervalId = setInterval(greenGradual, 100);
    });

    blueBtn.addEventListener('click', () =>{
        endInterval();
        blueGradual();
        intervalId = setInterval(blueGradual, 100);
    });

    //cycles through the pre-made array of colors
    function colorArray() {
        document.body.style.backgroundColor = colors[colorNumber];
        colorNumber++;
        if (colorNumber === colors.length) {
            colorNumber = 0;
        }
    }
    
    //cycles through random rgb values
    function randomColors(){
        const a = (Math.random() * 255 + 1);
        const b = (Math.random() * 255 + 1);
        const c = (Math.random() * 255 + 1);
        document.body.style.backgroundColor = `rgb(${a}, ${b}, ${c})`;
        
    }

    function redGradual(){
        document.body.style.backgroundColor = `rgb(${redVar}, 1, 1)`;
        redVar++;
        if(redVar === 255){
            redVar = 100;
        }
    }

    function greenGradual(){
        document.body.style.backgroundColor = `rgb(1, ${greenVar}, 1)`;
        greenVar++;
        if(greenVar === 255){
            greenVar = 100;
        }
    }

    function blueGradual(){
        document.body.style.backgroundColor = `rgb(1, 1, ${blueVar})`;
        blueVar++;
        if(blueVar === 255){
            blueVar = 100;
        }
    }

    //was attempting to make it that you can press any of the red, green, and blue buttons
    //but turns out to be much more complicated than I thought
    //(need to be able to get current rgb values and only modify one of them at a time)
    function changeColors3(color){


        return function() {
            document.body.style.backgroundColor = `rgb(${redVar}, ${redVar}, ${redVar})`;
            redVar++;
            if(redVar === 255){
                redVar = 100;
            }   
        };
    }
}());