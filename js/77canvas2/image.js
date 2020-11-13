(function () {
    'use strict';

    const canvas = document.getElementById('theCanvas');
    const context = canvas.getContext('2d');
    const UNIT = 64;
    const canvasHeight = 10;
    const canvasWidth = 14;
    const pointValue = 5;
    let appleX;
    let appleY;
    let score = 0;

    const snakeImg = new Image();
    snakeImg.src = 'images/snakehead.png';
    const appleImg = new Image();
    appleImg.src = 'images/apple.png';

    snakeImg.addEventListener('load', () =>{
        appleImg.addEventListener('load', repaint);
    });

    const SNAKE_SIZE = UNIT;
    let direction = 'ArrowRight';
    let snakeX = 0;
    let snakeY = 0;

    let snakeXmodifier = 1;
    let snakeYmodifier = 1;

    function resizeCanvas() {
        canvas.width = UNIT * canvasWidth;
        canvas.height = UNIT * canvasHeight;
    }
    // window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    newPosition();

    function newPosition() {
        const x = Math.floor((Math.random() * canvasWidth));
        const y = Math.floor((Math.random() * canvasHeight));
        appleX = x * UNIT;
        appleY = y * UNIT;
        console.log('position is', x, y);
    }




    // function animate() {
    //     requestAnimationFrame(animate);
    //     repaint();
    // }

    setInterval(repaint, 500);

    function repaint() {
        context.fillStyle = 'lightgreen';
        context.fillRect(0, 0, canvas.width, canvas.height);
        addApple();
        context.drawImage(snakeImg, snakeX * snakeXmodifier, snakeY * snakeYmodifier, SNAKE_SIZE, SNAKE_SIZE);

        context.fillStyle = 'black';
        context.font = 'bold 48px fantasy';
        context.fillText(score, canvas.width - 120, 50);


        if (snakeX === appleX && snakeY === appleY) {
            handleHit();
        }


        switch (direction) {
            case 'ArrowLeft':
                snakeX -= UNIT;
                break;
            case 'ArrowRight':
                snakeX += UNIT;
                break;
            case 'ArrowUp':
                snakeY -= UNIT;
                break;
            case 'ArrowDown':
                snakeY += UNIT;
                break;
        }

    }

    document.addEventListener('keydown', e => {
        //console.log(e);
        switch (e.key) {
            case 'ArrowUp':
            case 'ArrowDown':
            case 'ArrowLeft':
            case 'ArrowRight':
                direction = e.key;

        }
    });

    function addApple() {
        context.drawImage(appleImg, appleX, appleY, UNIT, UNIT);
    }

    function handleHit() {
        newPosition();
        score += pointValue;
    }
}());