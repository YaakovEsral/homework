(function () {
    'use strict';

    //get utility function
    function get(id) {
        return document.getElementById(id);
    }


    let randomColors = [];

    const startButton = get('start');
    const stopButton = get('stop');
    const defaultButton = get('default');

    let intervalId;


    //listeners for main buttons
    startButton.addEventListener('click', () => {
        if(!randomColors.length){
            get('table').deleteRow(1);
        }
        
        endInterval();
        changeColors();
        intervalId = setInterval(changeColors, 1000);
        startButton.disabled = true;
    });

    stopButton.addEventListener('click', () => {
        endInterval();
        startButton.disabled = false;
    });

    defaultButton.addEventListener('click', () => {
        endInterval();
        document.body.style.backgroundColor = 'white';
        document.body.style.color = 'black';
    });

    //clear interval function
    function endInterval() {
        clearInterval(intervalId);
    }

    //self explanatory, I think
    function generateRandomNumber(){
        return Math.floor((Math.random() * 255 + 1));
    }

    //cycles through random rgb values
    function changeColors() {
        //for foreground/text color
        const r = generateRandomNumber();
        const g = generateRandomNumber();
        const b = generateRandomNumber();
        get('content').style.color = `rgb(${r}, ${g}, ${b})`;
        //for background color
        const r2 = generateRandomNumber();
        const g2 = generateRandomNumber();
        const b2 = generateRandomNumber();
        document.body.style.backgroundColor = `rgb(${r2}, ${g2}, ${b2})`;
        createRow(r, g, b, r2, g2, b2);
        randomColors.push(`rgb(${r}, ${g}, ${b})`);
    }


     function createRow(r, g, b, r2, g2, b2) {
        //creating new row with 3 new cells
        const newRow = get('tbody').insertRow();
        const timeCell = newRow.insertCell();
        const colorCell = newRow.insertCell();
        const bgColorCell = newRow.insertCell();

        //get the date and time (code from MDN - need to go over it)
        let [month, date, year] = (new Date()).toLocaleDateString().split("/");
        let [hour, minute, second] = (new Date()).toLocaleTimeString().slice(0, 7).split(":");

        //set the time and colors for the cells
        timeCell.innerHTML = `${month}/${date}/${year}, ${hour}:${minute}:${second}`;
        colorCell.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        bgColorCell.style.backgroundColor = `rgb(${r2}, ${g2}, ${b2})`;

        //saving the styles of the color cells into variables
        const colorCellStyle = window.getComputedStyle(colorCell);
        const bgColorCellStyle = window.getComputedStyle(bgColorCell);
    
        //event listener for row: re-implement colors from that row on click
        newRow.addEventListener('click', () =>{
            endInterval();
            get('content').style.color = colorCellStyle.getPropertyValue('background-color');
            document.body.style.backgroundColor = bgColorCellStyle.getPropertyValue('background-color');
        });
    }

}());