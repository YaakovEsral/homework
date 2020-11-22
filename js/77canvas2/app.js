(function () {
'use strict';

/*
issues:
-slow reacting time. would be better to use getAnimationFrame and change the intervals ourselves
    -done!
-slow loading time for the first load of the sound file
-we should be making promises and on promise return start the game
-properly center the GAME OVER text (maybe use an html element)
    done!
 
improvements:
-make snake grow each time
    done!
-get the score in its own spot
    done!
-sound for crashing into the wall
    done!
-maybe make a grid
-make smooth motion that will only change direction on the grid squares
-increase points when   a)player passes a certain point threshold,
                            done!
                        or
                        b)player hits the apple within a certain timeframe
                            done!

-increase game speed when user passes a certain point threshold
    done!

-save high scores in local storage
    done!
-order them from greatest to least
    done!
-high score pop up box
    done!
-allow users to choose whether to save their score
    done!
-display if this score is a high score

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
const hudOffset = 1 * UNIT;

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

let snakeXunit;
let snakeYunit;

let snakeParts = [];

let appleX;
let appleY;

let score;
let scoreUnit;
const SCORE_BONUS = 10;
let bonusMessageDisplay = false;
const highScores = localStorage.highScores ? JSON.parse(localStorage.highScores) : [];

let oldTimestamp;
let interval;
let lastAppleEaten;
let currentAppleEaten;

let paused;

const buttonDiv = get('buttonDiv');
const playAgainBtn = get('playAgain');
const openHighScoreFormBtn = get('openHighScoreForm');
const saveScoreBtn = get('saveScore');
const saveScoreForm = get('saveScoreForm');
const quitSaveScoreFormBtn = get('quitSaveScoreForm');
const highScoreBox = get('highScoreBox');
const usernameInput = get('username');
const viewHighScoresBtn = get('viewHighScores');
const highScoreDisplay = get('highScoreDisplay');
const highScoresList = get('highScoresList');
const quitHighScores = get('quitHighScores');
const quitBtn = get('noThanks');



snakeImg.addEventListener('load', () => {
    appleImg.addEventListener('load', () => {
        // chomp.oncanplaythrough = () =>{
        startGame();

        // };
    });
});

function startGame() {
    snakeXunit = UNIT;
    snakeYunit = 0;

    snakeParts = [];

    snakeParts[0] = {
        part: 'head',
        img: snakeImg,
        x: 0,
        y: hudOffset
    };

    interval = 400;
    score = 0;
    scoreUnit = 3;
    lastAppleEaten = window.performance.now();
    paused = false;

    newApplePosition();
    gameOn = true;
    animate();
}

function animate(timestamp) {
    if (!gameOn) {
        return;
    }

    if (!oldTimestamp) {
        oldTimestamp = timestamp;
    }

    if (timestamp - oldTimestamp >= interval) {
        oldTimestamp = timestamp;
        repaint();
    }
    // repaint();
    requestAnimationFrame(animate);
}

function repaint() {
    if (!paused) {
        drawMainDisplay();

        c.drawImage(appleImg, appleX, appleY, UNIT, UNIT);

        drawSnake();

        if (bonusMessageDisplay) {
            c.fillStyle = 'black';
            c.font = '50px fantasy';
            c.textAlign = 'center';
            c.fillText('QUICK SCORE!', canvas.width / 2, canvas.height / 3.3);
            c.fillText(`BONUS ${SCORE_BONUS} POINTS`, canvas.width / 2, canvas.height / 2.5);
        }


        //when the snake hits the apple
        if (snakeParts[0].x === appleX && snakeParts[0].y === appleY) {
            newApplePosition();
            chomp.muted = false;
            chomp.play();
            score += scoreUnit;

            //update the score unit and interval every 5 apples
            if (snakeParts.length % 5 === 0) {
                scoreUnit *= 2;
                //don't let interval go under 100
                if (interval > 100) {
                    interval *= 0.75;
                }

            }
            //bonus points if you get the next apple fast enough
            lastAppleEaten = currentAppleEaten || window.performance.now();
            currentAppleEaten = window.performance.now();
            // console.log('last', lastAppleEaten, 'current', currentAppleEaten);
            if (currentAppleEaten - lastAppleEaten < 4000) {
                score += SCORE_BONUS;
                bonusMessageDisplay = true;
                setTimeout(() => bonusMessageDisplay = false, 1500);
            }

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
            snakeParts[0].x > fieldWidth - UNIT ||
            snakeParts[0].y - hudOffset < 0 ||
            snakeParts[0].y - hudOffset > fieldHeight - UNIT
        ) {
            endGame();

            c.strokeStyle = '#e41d1d';
            c.lineWidth = 6;
            c.strokeRect(0, hudOffset, fieldWidth, fieldHeight);
        }

        //if the snake hits itself
        for (let i = 1; i < snakeParts.length; i++) {
            if (snakeParts[0].x === snakeParts[i].x &&
                snakeParts[0].y === snakeParts[i].y) {
                endGame();
            }
        }
    }
}

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        //if statements to ensure you can't reverse direction when longer than 1 part
        case 'ArrowLeft':
            if (snakeParts.length === 1 || snakeYunit !== 0) {
                snakeXunit = -UNIT;
                snakeYunit = 0;
            }
            break;
        case 'ArrowRight':
            if (snakeParts.length === 1 || snakeYunit !== 0) {
                snakeXunit = UNIT;
                snakeYunit = 0;
            }
            break;
        case 'ArrowDown':
            if (snakeParts.length === 1 || snakeXunit !== 0) {
                snakeXunit = 0;
                snakeYunit = UNIT;
            }
            break;
        case 'ArrowUp':
            if (snakeParts.length === 1 || snakeXunit !== 0) {
                snakeXunit = 0;
                snakeYunit = -UNIT;
            }
            break;
        case ' ':  //if it was the spacebar
            paused = !paused;
            togglePauseOverlay();
            break;
    }
});


//game functions

function drawMainDisplay() {
    //hud styling
    c.fillStyle = '#81e2ef';
    c.fillRect(0, 0, hudWidth, hudHeight);

    c.strokeStyle = '#1373bf';
    c.lineWidth = 8;
    c.strokeRect(0, 0, hudWidth, hudHeight);

    //hud content
    c.fillStyle = 'darkgreen';
    c.font = '48px fantasy';
    c.textAlign = 'left';
    c.fillText(`The Snake Game`, 50, 50);

    c.fillStyle = 'darkgreen';
    c.font = '48px fantasy';
    c.fillText(`Score: ${score}`, hudWidth - 250, 50);

    //field styling
    c.fillStyle = '#98e262';
    c.fillRect(0, hudOffset, fieldWidth, fieldHeight);

}

function newApplePosition() {
    let spotOccupied = true;
    let x;
    let y;

    while (spotOccupied) {
        x = Math.floor((Math.random() * (fieldWidth / UNIT)));
        y = Math.floor((Math.random() * fieldHeight / UNIT));
        spotOccupied = snakeParts.some(part => (x * UNIT) === part.x && (y * UNIT) + hudOffset === part.y); //jshint ignore: line
    }
    appleX = x * UNIT;
    appleY = (y * UNIT) + hudOffset;
}

function drawSnake() {

    if (snakeParts.length > 1) {
        //update all snake parts position
        for (let i = snakeParts.length - 1; i > 0; i--) {
            snakeParts[i].x = snakeParts[i - 1].x;
            snakeParts[i].y = snakeParts[i - 1].y;
        }

        //draw all the snake parts except the head
        for (let i = 1; i < snakeParts.length; i++) {
            c.drawImage(snakeParts[i].img, snakeParts[i].x, snakeParts[i].y, UNIT, UNIT);
        }
    }
    snakeParts[0].x += snakeXunit;
    snakeParts[0].y += snakeYunit;

    c.drawImage(snakeImg, snakeParts[0].x, snakeParts[0].y, UNIT, UNIT);

}

function togglePauseOverlay() {
    if (gameOn && paused) {
        c.fillStyle = 'rgba(0, 0, 0, .3)';
        c.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function endGame() {
    bonusMessageDisplay = false;

    wail.muted = false;
    wail.play();
    c.fillStyle = 'black';
    c.font = 'bold 70px fantasy';
    c.textAlign = 'center';
    c.fillText('GAME OVER', canvas.width / 2, canvas.height / 3.3);
    c.fillText(`Final Score: ${score}`, canvas.width / 2, canvas.height / 2.5);
    gameOn = false;
    // drawMainDisplay();
    // c.drawImage(appleImg, appleX, appleY, UNIT, UNIT);
    // drawSnake();


    setTimeout(() => {
        buttonDiv.classList.remove('hidden');
    }, 1000);
}

function updateHighScoresDisplay() {
    const numScoresToDisplay = Math.min(5, highScores.length);
    highScoresList.innerHTML = '';
    for (let i = 0; i < numScoresToDisplay; i++) {
        const elem = `
            <li>${highScores[i].name} - ${highScores[i].score}</li>
            `;
        highScoresList.innerHTML += elem;
    }
}

//Button listeners

//enable user to play again
playAgainBtn.addEventListener('click', () => {
    hide(buttonDiv);
    startGame();
    show(openHighScoreFormBtn);

});

openHighScoreFormBtn.addEventListener('click', () => {
    hide(buttonDiv);
    show(highScoreBox);
});

usernameInput.addEventListener('keyup', () => {
    saveScoreBtn.disabled = false;
    saveScoreBtn.disabled = usernameInput.value.length < 1;
});

saveScoreForm.addEventListener('submit', (e) => {
    e.preventDefault();
    saveScoreBtn.disabled = true;
    hide(highScoreBox);
    // show(buttonDiv);
    hide(openHighScoreFormBtn);
    show(highScoreDisplay);
    highScores.push({ name: usernameInput.value, score: score });
    highScores.sort((a, b) => b.score - a.score);
    localStorage.highScores = JSON.stringify(highScores);
    updateHighScoresDisplay();
    usernameInput.value = '';
});

quitSaveScoreFormBtn.addEventListener('click', () =>{
    hide(highScoreBox);
    show(buttonDiv);
});

viewHighScoresBtn.addEventListener('click', () => {
    show(highScoreDisplay);
    updateHighScoresDisplay();
});

quitHighScores.addEventListener('click', () => {
    hide(highScoreDisplay);
    show(buttonDiv);
});

quitBtn.addEventListener('click', () => {
    hide(buttonDiv);
    show(openHighScoreFormBtn);
    c.fillStyle = '#98e262';
    c.fillRect(0, hudOffset, fieldWidth, fieldHeight);

    c.fillStyle = 'black';
    c.font = 'bold 70px fantasy';
    c.textAlign = 'center';
    c.fillText('BYE BYE', canvas.width / 2, canvas.height / 2.2);
});

//utility functions

function show(elem) {
    elem.classList.remove('hidden');
}

function hide(elem) {
    elem.classList.add('hidden');
}
}());