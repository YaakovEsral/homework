window.pcs = window.pcs || {};
window.pcs.clock = (function () {
    'use strict';

    const offsetAndWidth = 125;
    let leftOffset = 0;
    
    function generateClock() {
        const containerDiv = document.createElement('div');


        //creating clock and setting id
        const clockDiv = document.createElement('div');
        clockDiv.id = 'clockDiv';

        //styling the clock
        clockDiv.style.display = 'inline-block';
        clockDiv.style.border = '1px solid black';
        clockDiv.style.padding = '1em';
        clockDiv.style.fontSize = '20px';
        clockDiv.style.borderRadius = '3px';
        //using position fixed so it's always at the bottom of the viewport
        //position absolute would only put it on bottom when there is enough content
        // clockDiv.style.position = 'absolute';

        // clockDiv.style.right = '0px'; 

        //styling the container
        containerDiv.appendChild(clockDiv);
        containerDiv.style.position = 'fixed';
        containerDiv.style.bottom = '0px';
        containerDiv.style.left = `${leftOffset}px`;
        containerDiv.style.height = '50px';
        containerDiv.style.width = `${offsetAndWidth}px`;
        document.body.appendChild(containerDiv);

        leftOffset += offsetAndWidth;

        //create new date each time this function is called
        let d = new Date();
        let hours = d.getHours();
        let minutes = d.getMinutes();
        let seconds = d.getSeconds();


        //increment time by seconds - will be called each 1000 ms interval
        function updateTime() {
            seconds++;
            if (seconds === 60) {
                minutes++;
                seconds = 0;
            }
            if (minutes === 60) {
                hours++;
                minutes = 0;
            }
            if (hours > 12) {
                hours = hours - 12;
            }
            //string variable combining all numbers
            let timeString = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;

            //set inner html to the time string
            clockDiv.innerHTML = timeString;
        }

        //in case the number is only one digit, convert to string and add a '0'
        function padZero(num) {
            let paddedNum = num.toString();
            if (paddedNum.length < 2) {
                paddedNum = '0' + paddedNum;
            }
            return paddedNum;
        }

        updateTime();
        setInterval(updateTime, 1000);


    }
    return {
        generateClock: generateClock
    };
})();