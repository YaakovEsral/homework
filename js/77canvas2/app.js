(function () {
    'use strict';

    /*
    issues:
    -slow reacting time. would be better to use getAnimationFrame and change the intervals ourselves
        -done!
    -slow loading time for the first load of the sound file
    -we should be making promises and on promise return start the game
    -properly center the GAME OVER text (maybe use an html element)
    
    improvements:
    -make snake grow each time
        done!
    -get the score in its own spot
        done!
    -sound for crashing into the wall
        done!
    -maybe make a grid
    -make smooth motion that will only change direction on the grid squares
    -increase points when   a)player passes a certain point threshold, or
                            b)player hits the apple within a certain timeframe

    -increase game speed when user passes a certain point threshold

    */

    function get(id) {
        return document.getElementById(id);
    }

    const canvas = get('theCanvas');
    const c = canvas.getContext('2d');

    const UNIT = 64;
    const fieldWidth = 14 * UNIT;
    const fieldHeight = 10 * UNIT;

    const hudWidth = fieldWidth;
    const hudHeight = 1 * UNIT;

    canvas.width = fieldWidth;
    canvas.height = fieldHeight + hudHeight;

    const snakeImg = new Image();
    snakeImg.src = 'media/snakehead.png';
    const appleImg = new Image();
    appleImg.src = 'media/apple.png';
    const snakeBodyImg = new Image();
    snakeBodyImg.src = 'media/snakeBody.png';

    const chomp = document.createElement('audio');
    chomp.src = 'media/chomp.mp3';
    chomp.muted = true;
    const wail = document.createElement('audio');
    wail.src = 'media/wail.mp3';
    wail.muted = 'muted';
    const geshmak = document.createElement('audio');
    geshmak.src = 'media/geshmak.mp3';
    chomp.muted = true;

    let gameOn = false;

    let snakeX;
    let snakeY;
    let snakeXunit;
    let snakeYunit;

    let snakeParts = [];
    // snakeParts.body = [];

    let appleX;
    let appleY;

    let score = 0;
    const SCORE_UNIT = 5;

    let oldTimestamp;
    let interval = 300;

    const buttonDiv = get('buttonDiv');
    const playAgainBtn = get('playAgain');
    const quitBtn = get('noThanks');

    //code to determine how the ready state of the audio files works
    // const now = new Date();

    // chomp.onloadstart = logTime(chomp);
    // chomp.ondurationchange = logTime(chomp);
    // chomp.onloadedmetadata = logTime(chomp);
    // chomp.onloadeddata = logTime(chomp);
    // chomp.onprogress = logTime(chomp);
    // chomp.oncanplay = logTime(chomp);
    // chomp.oncanplaythrough = logTime(chomp);

    // function logTime(file) {
    //     console.log('ready state', file.readyState, now.getMilliseconds());
    // }

    // const int = setInterval(() =>{
    //     console.log('ready state', chomp.readyState, now.getMilliseconds());
    //     if(chomp.readyState === 4) {
    //         clearInterval(int);
    //     }
    // },5);

    snakeImg.addEventListener('load', () => {
        appleImg.addEventListener('load', () => {
            // chomp.oncanplaythrough = () =>{
            startGame();

            // };
        });
    });

    function startGame() {
        // snakeX = 0;
        // snakeY = UNIT;
        snakeXunit = UNIT;
        snakeYunit = 0;

        snakeParts = [];

        snakeParts[0] = {
            part: 'head',
            img: snakeImg,
            x: 0,
            y: UNIT
        };

        newApplePosition();
        // repaint();
        gameOn = true;
        animate();
    }

    // setInterval(() => {
    //     if (gameOn) {
    //         repaint();
    //     }
    // }, 500);

    function animate(timestamp) {
        // console.log(timestamp);
        if (!oldTimestamp) {
            oldTimestamp = timestamp;
        }

        if (timestamp - oldTimestamp >= interval) {
            oldTimestamp = timestamp;
            repaint();
        }

        if (!gameOn) {
            return;
        }
        // repaint();
        requestAnimationFrame(animate);
    }

    function repaint() {
        //hud styling
        c.fillStyle = 'lightblue';
        c.fillRect(0, 0, hudWidth, hudHeight);

        c.strokeStyle = 'cadetblue';
        c.lineWidth = 8;
        c.strokeRect(0, 0, hudWidth, hudHeight);

        //hud content
        c.fillStyle = 'darkgreen';
        c.font = '48px fantasy';
        c.fillText(`The Snake Game`, 50, 50);

        c.fillStyle = 'darkgreen';
        c.font = '48px fantasy';
        c.fillText(`Score: ${score}`, hudWidth - 250, 50);

        //field styling
        c.fillStyle = 'lightgreen';
        c.fillRect(0, hudHeight, fieldWidth, fieldHeight);

        //when the snake hits the apple
        if (snakeParts[0].x === appleX && snakeParts[0].y === appleY) {
            newApplePosition();
            chomp.muted = false;
            chomp.play();
            score += SCORE_UNIT;

            //add a body part
            snakeParts.push({
                part: 'body',
                img: snakeBodyImg,
                // x: snakeParts[snakeParts.length - 1].x,
                // y: snakeParts[snakeParts.length - 1].y
                x: undefined,
                y: undefined
            });
        }

        //when the snake hits a wall
        if (
            snakeParts[0].x < 0 ||
            snakeParts[0].x > fieldWidth ||
            snakeParts[0].y < UNIT ||
            snakeParts[0].y > fieldHeight + UNIT) {
            c.strokeStyle = 'red';
            c.lineWidth = 6;
            c.strokeRect(0, UNIT, fieldWidth, fieldHeight);

            // const gameOverText = `
            // GAME OVER \n Final Score: ${score}
            // `;
            endGame();
        }

        //if the snake hits itself
            for (let i = 1; i < snakeParts.length; i++) {
                if (snakeParts[0].x === snakeParts[i].x &&
                    snakeParts[0].y === snakeParts[i].y) {
                    endGame();
                }
            }

        c.drawImage(appleImg, appleX, appleY, UNIT, UNIT);

        drawSnake();
    }

    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowLeft':
                snakeXunit = -UNIT;
                snakeYunit = 0;
                break;
            case 'ArrowRight':
                snakeXunit = UNIT;
                snakeYunit = 0;
                break;
            case 'ArrowDown':
                snakeXunit = 0;
                snakeYunit = UNIT;
                break;
            case 'ArrowUp':
                snakeXunit = 0;
                snakeYunit = -UNIT;
                break;
        }
    });

    function newApplePosition() {
        const x = Math.floor((Math.random() * (fieldWidth / UNIT)));
        const y = Math.floor((Math.random() * fieldHeight / UNIT));
        appleX = x * UNIT;
        appleY = (y * UNIT) + UNIT;
    }

    function drawSnake() {

        if (snakeParts.length > 1) {
            //update all snake parts position
            for (let i = snakeParts.length - 1; i > 0; i--) {
                snakeParts[i].x = snakeParts[i - 1].x;
                snakeParts[i].y = snakeParts[i - 1].y;
            }

            for (let i = 1; i < snakeParts.length; i++) {
                c.drawImage(snakeParts[i].img, snakeParts[i].x, snakeParts[i].y, UNIT, UNIT);
            }
        }
        snakeParts[0].x += snakeXunit;
        snakeParts[0].y += snakeYunit;

        c.drawImage(snakeImg, snakeParts[0].x, snakeParts[0].y, UNIT, UNIT);

    }

    function endGame() {
        wail.muted = false;
        wail.play();
        c.fillStyle = 'black';
        c.font = 'bold 70px fantasy';
        c.fillText('GAME OVER', canvas.width / 3, canvas.height / 2.5);
        c.fillText(`Final Score: ${score}`, canvas.width / 3.3, canvas.height / 2);
        gameOn = false;

        setTimeout(() => {
            buttonDiv.classList.remove('hidden');
        }, 1000);
    }

    //enable user to play again
    playAgainBtn.addEventListener('click', () => {
        buttonDiv.classList.add('hidden');
        startGame();
    });

    quitBtn.addEventListener('click', () => {
        buttonDiv.classList.add('hidden');
        c.fillStyle = 'lightgreen';
        c.fillRect(0, hudHeight, fieldWidth, fieldHeight);

        c.fillStyle = 'black';
        c.font = 'bold 70px fantasy';
        c.fillText('BYE BYE', canvas.width / 2.6, canvas.height / 2.2);
    });
}());