import './css/style.css';
import { Avatar } from './avatar';
import { Bubble } from './bubble';
import { bubbleTypes } from './bubble';
import { Level } from './level';
import json from './levels.json5';
import { startAnimation } from './app';

function get(id) {
    return document.getElementById(id);
}

/*
Bugs:
1. Avatar is able to go off the screen if the key event was fired before he was off. - fixed!
2. Game sometimes starts before the avatar is fully loaded (use Promise)
3. ball collision with avatar doesn't work when ball comes from top - fixed!
*/

const canvas = get('canvas');
const c = canvas.getContext('2d');

//height to width should be 4:6
export const UNIT = Math.floor(window.innerHeight / 24);
console.log(window.innerHeight, UNIT);
canvas.height = UNIT * 24;
canvas.width = UNIT * 36;

const gameFont = 'Luckiest Guy';

let gameOn = false;

const hud = {
    height: UNIT * 3,
    width: canvas.width,
    img: new Image()
};
hud.img.src = './images/brickBg.png';

const field = {
    height: canvas.height - hud.height,
    width: canvas.width
};

const timerWidth = hud.width - UNIT;
const timerHeight = UNIT * 0.75;

let timeElapsed;
let timeInc;
let timeRunning;
let timeUp;

const avatarHeadImg = new Image();
avatarHeadImg.src = './images/avatarHead.png';
avatarHeadImg.height = avatarHeadImg.width = UNIT * 1.75;

let score;
const scoreFactor = 3; //points per hit = bubbleType * scoreFactor
const timeScoreFactor = 5; //used to calculate points for completing level in time
const ceilingBonusFactor = 2;

let avatar;
let bubbles = [];

let levelIndex;
const levels = [];
for (let i = 0; i < json.length; i++) {
    levels[i] = new Level(json[i]);
}

let animationId;
/*originally used to import all bg images at one time. now we are using CopyPlugin to 
copy all images from original directory 'src/images' into 'dist/images'
*/
//import all level bg images 
// function importAll(r) {
//     return r.keys().map(r);
// }
// const bgImages = importAll(require.context('./images', false, /level/));

function animate() {
    // if (gameOn) { //may want to move this later to the actual loop
    repaint();
    animationId = requestAnimationFrame(animate);
    // }
}

// import bg from './images/level1.png';
// const backgroundImg = new Image();
// backgroundImg.src = bg;

// startNewGame();

export function startNewGame() {
    avatar = new Avatar(field, UNIT);
    bubbles = [];

    score = 0;
    levelIndex = 0;
    timeUp = false;
    gameOn = true;

    getNewLevel();
    levels[levelIndex].bgImg.onload = animate();
    // animate();
}
// console.log(avatarHeadImg);
function repaint() {
    // console.log(animationId, 'anim Id');

    if (gameOn) {
        c.drawImage(levels[levelIndex].bgImg, 0, 0, canvas.width, canvas.height);

        //drawing the hud
        c.drawImage(hud.img, 0, canvas.height - hud.height, hud.width, hud.height);

        //time
        updateTime();

        //level no.
        c.fillStyle = '#054263';
        c.font = `${UNIT * 1.5}px ${gameFont}`;
        c.textAlign = 'center';
        c.textBaseline = 'top';
        c.fillText(`Level ${levelIndex + 1}`, UNIT * 3, field.height + hud.height / 2);

        //lives
        c.fillStyle = '#054263';
        c.font = `${UNIT * 1.5}px ${gameFont}`;
        c.textAlign = 'left';
        c.textBaseline = 'top';
        c.fillText('Lives:', field.width / 3, field.height + hud.height / 2);

        let offset = 0; //offset to space the lives
        for (let i = 0; i < avatar.lives; i++) {
            c.drawImage(avatarHeadImg,
                field.width / 2 - avatarHeadImg.width + offset,
                field.height + hud.height / 2 - avatarHeadImg.height / 4,
                avatarHeadImg.width,
                avatarHeadImg.height);
            offset += avatarHeadImg.width * 1.25;
        }


        //score
        updateScore();

        //end level if time is out
        if (timerWidth - timeElapsed <= 0) {
            c.fillStyle = 'yellow';
            c.font = `${UNIT * 3}px ${gameFont}`;
            c.textAlign = 'center';
            c.fillText('TIME\'S UP!!!', field.width / 2, field.height / 3);
            timeUp = true;
            endLevel();
        }

        //end level if a bubble hits the avatar
        for (let i = 0; i < bubbles.length; i++) {
            if (bubbles[i].x + bubbles[i].radius > avatar.x + avatar.hitOffset &&
                bubbles[i].x - bubbles[i].radius < avatar.x + avatar.width - avatar.hitOffset &&
                bubbles[i].y > avatar.y) {
                avatar.gotHit = true;
                avatar.lives--;
                // console.log('lives remaining', avatar.lives);
                if (avatar.lives === 0) {
                    endLevel();
                } else {
                    gameOn = false;
                    setTimeout(getNewLevel, 500);
                }
                break;
            }
        }

        //draw the beam
        if (avatar.beam.shooting) {
            c.strokeStyle = avatar.beam.color;
            c.lineWidth = avatar.beam.width;
            c.beginPath();
            c.moveTo(avatar.beam.x, avatar.beam.yBottom);
            c.lineTo(avatar.beam.x, avatar.beam.yTop -= avatar.beam.increment);
            c.stroke();

            //check for beam collision while beam is shooting
            for (let i = 0; i < bubbles.length; i++) {
                if (bubbles[i].checkBeamCollision(avatar.beam) === true) {
                    handleBeamCollision(i);
                } else if (bubbles[i].checkCeilingCollision() === true) {
                    handleCeilingCollision(i);
                }
            }
        }

        //reset the beam once it goes off the screen
        if (avatar.beam.yTop <= 0) {
            avatar.resetBeam();
        }

        //move the avatar if it is in a moving state
        if (avatar.movePlusMinus !== 0) {
            avatar.move();
        }
        //draw the avatar
        c.drawImage(avatar.img, avatar.x, avatar.y, avatar.width, avatar.height);

        //draw the bubbles
        bubbles.forEach(bubble => bubble.update());

    }
}

function getNewLevel() {
    timeInc = UNIT / levels[levelIndex].timeFactor;
    timeElapsed = 0;
    timeRunning = true;
    gameOn = true;
    bubbles = [];
    avatar.gotHit = false;

    levels[levelIndex].bubbles.forEach(bubble => {
        
        bubbles.push(new Bubble(
            {field: field,
            ctx: c}, 
            bubble, 
            UNIT
        ));
        
    });
}

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowRight':
            if (avatar.x + avatar.width >= canvas.width || avatar.movePlusMinus !== 0) {
                return;
            }
            avatar.movePlusMinus = 1;
            break;
        case 'ArrowLeft':
            if (avatar.x <= 0 || avatar.movePlusMinus !== 0) {
                return;
            }
            avatar.movePlusMinus = -1;
            break;
        case ' ':
            avatar.shoot();
            break;
    }
});

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'ArrowRight':
        case 'ArrowLeft':
            avatar.movePlusMinus = 0;
            break;
    }
});

function handleBeamCollision(index) {
    const oldBubble = bubbles[index];

    //increment score. may make a function for this later
    score += oldBubble.type * scoreFactor;

    //remove the bubble and the beam
    bubbles.splice(index, 1);
    avatar.resetBeam();

    if (oldBubble.type > 1) { //if it's anything but the smallest type
        //create two new bubbles
        bubbles.push(new Bubble(
            {field: field,
            ctx: c},
            {
                x: oldBubble.x,
                y: oldBubble.y,
                color: oldBubble.color,
                velocityX: -Math.abs(oldBubble.velocityX),
                velocityY: -Math.abs(oldBubble.maxBounceYVelocity * 0.7),
                type: oldBubble.type - 1
            }, UNIT
        ));
        bubbles.push(new Bubble(
            {field: field,
                ctx: c},    
            {
                x: oldBubble.x,
                y: oldBubble.y,
                color: oldBubble.color,
                velocityX: Math.abs(oldBubble.velocityX),
                velocityY: -Math.abs(oldBubble.maxBounceYVelocity * 0.7), //-Math.abs(oldBubble.velocityY)
                type: oldBubble.type - 1
            }, UNIT
        ));
    }
    if (!bubbles.length) {
        endLevel();
    }
}

function handleCeilingCollision(index) {
    // console.log('ceiling collision');
    const oldBubble = bubbles[index];

    //increment score. may make a function for this later
    score += oldBubble.type;
    score += oldBubble.type * ceilingBonusFactor;

    //remove the bubble and the beam
    bubbles.splice(index, 1);
    avatar.resetBeam();

    if (!bubbles.length) {
        endLevel();
    }
}

function updateScore() {
    c.fillStyle = '#054263';
    c.font = `${UNIT * 1.5}px ${gameFont}`;
    c.textAlign = 'center';
    c.textBaseline = 'top';
    c.fillText(`Score: ${score}`, hud.width - UNIT * 5, field.height + hud.height / 2);
}

function updateTime() {
    c.strokeStyle = 'black';
    c.lineWidth = 1;
    c.strokeRect(UNIT * 0.5, field.height + UNIT * 0.25, timerWidth, timerHeight);
    c.fillStyle = '#e41d1d';
    c.fillRect(UNIT * 0.5, field.height + UNIT * 0.25, timerWidth - timeElapsed, timerHeight);
    if (timeRunning) {
        timeElapsed += timeInc;
    }
}

function endLevel() {
    timeRunning = false;

    if (timeUp || avatar.gotHit) {
        gameOn = false;
        endGame();
        return;
    }

    // console.log('end level');
    score += Math.floor((timerWidth / timeElapsed) * timeScoreFactor);

    avatar.resetBeam();
    if (levelIndex >= levels.length) {
        return;
    }
    setTimeout(() => {
        levelIndex++;
        getNewLevel();
    }, 1000);
}

function endGame() {
    setTimeout(() => {
        c.fillStyle = 'yellow';
        c.font = `${UNIT * 3}px ${gameFont}`;
        c.textAlign = 'center';
        c.fillText('GAME OVER', field.width / 2, field.height / 2);

        cancelAnimationFrame(animationId);
        // console.log('just canceled', animationId);
        setTimeout(startAnimation, 2000);
    }, 500);

}