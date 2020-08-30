window.pcs = window.pcs || {};
window.pcs.messageBox = (function () {
    'use strict';

    //variables for sizing and positioning
    const offset = 30;
    let leftOffset = -150;
    let topOffset = -75;
    const width = 300;
    const height = 150;
    let nextZindex = 1;

    //modal overlay that will cover the screen
    const modalOverlay = document.createElement('div');

    modalOverlay.style.position = 'fixed';
    modalOverlay.style.width = '100%';
    modalOverlay.style.height = '100%';
    modalOverlay.style.left = '0';
    modalOverlay.style.top = '0';
    modalOverlay.style.backgroundColor = 'lightgray';
    modalOverlay.style.opacity = '.5';
    document.body.appendChild(modalOverlay);

    //function to show a message box
    function show(msg, modalStatus, buttonArray = ['Okay'], callback) {
        //message box with a span element for the message
        const messageBox = document.createElement('div');
        const span = document.createElement('span');
        messageBox.appendChild(span);
        span.innerHTML = msg;


        //adding all buttons in the array to a new div
        const buttons = document.createElement('div');
        buttonArray.forEach((elem) =>{
            const button = document.createElement('button');
            button.innerHTML = elem;
        
            //listener for button - remove message box and modal overlay
            button.addEventListener('click', () =>{
                document.body.removeChild(messageBox);
                modalOverlay.style.display = 'none';
                callback(elem);
            });
            
            buttons.appendChild(button);
        });
        messageBox.appendChild(buttons);
        document.body.appendChild(messageBox);


        //put each box at the top on click
        messageBox.addEventListener('click', () =>{
            messageBox.style.zIndex = nextZindex++;
        });

        //only show the modal overlay if the user checks the box
        if (modalStatus){
            modalOverlay.style.display = 'block';
            modalOverlay.style.zIndex = nextZindex;
        }

        messageBox.className = 'messageBox';

        //style for the message box
        //probably should move all this to a css file...
        messageBox.style.backgroundColor = 'lightblue';
        messageBox.style.width = `${width}px`;
        messageBox.style.height = `${height}px`;
        messageBox.style.padding = '1em';
        messageBox.style.paddingBottom = '38px';
        messageBox.style.boxSizing = 'border-box';
        messageBox.style.position = 'absolute';
        messageBox.style.top = '50%';
        messageBox.style.left = '50%';
        messageBox.style.marginLeft = `${leftOffset}px`;
        messageBox.style.marginTop = `${topOffset}px`;
        messageBox.style.border = '1px solid black';
        messageBox.style.zIndex = nextZindex++;

        //style for the span element
        span.style.overflow = 'auto';
        span.style.height = "100%";
        span.style.display = 'inline-block';

        //style for the button
        buttons.style.position = 'absolute';
        buttons.style.bottom = '10px';
        buttons.style.left = '0';
        buttons.style.width = '100%';
        buttons.style.textAlign = 'center';

        //with each new message box, change the offset so the box appears somewhere else
        leftOffset += offset;
        topOffset +=offset;

        //once a box is about to go off the screen in either direction, change the offset
        if (parseFloat(getComputedStyle(messageBox).left, 10) + leftOffset + width > window.innerWidth){
            leftOffset -= window.innerWidth - width;
        }
        if (parseFloat(getComputedStyle(messageBox).top, 10) + topOffset + height > window.innerHeight){
            topOffset -= window.innerHeight - height;
        }
    }

    return {
        show: show
    };
}());