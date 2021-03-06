import { startNewGame, UNIT, setLevelIndex } from './game';
import jsonLevels from './levels.json5';


function get(id) {
    return document.getElementById(id);
}

function show(elem) {
    elem.classList.remove('hidden');
}

function hide(elem) {
    elem.classList.add('hidden');
}

const buttonDiv = get('buttonDiv');
const howToPlayOverlay = get('howToPlayOverlay');
const aboutOverlay = get('aboutOverlay');
const devBtn = get('devBtn');
const developerOverlay = get('developerOverlay');

const canvas = get('canvas');
const c = canvas.getContext('2d');
const height = canvas.height;
const width = canvas.width;

const bgImg = new Image();
bgImg.src = './images/mainBg.png';

const avatarImg = new Image();
avatarImg.src = './images/mainAvatar.png';
avatarImg.width = UNIT * 8;
avatarImg.height = UNIT * 12;
console.log(UNIT, 'unit');

setLevelIndex(0);


let animationOn = false;
let animationId;

function animate() {
    if (animationOn) {
        repaint();
        animationId = requestAnimationFrame(animate);
    }
}

// console.log(canvas.height, 'height');

function repaint() {
    c.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

    //draw the bubbles
    circles.forEach(circle => circle.update());

    c.fillStyle = 'rgba(0, 0, 109, 0.7)';
    c.fillRect(UNIT * 2, UNIT * 3.2, canvas.width - (UNIT * 4), UNIT * 5);

    c.fillStyle = '#fff705';
    c.font = `${UNIT * 4}px Luckiest Guy`;
    c.textAlign = 'center';
    c.textBaseline = 'alphabetic';
    // console.log(c);
    c.fillText('Bubble Trouble', canvas.width/2, canvas.height * 0.3);

    c.drawImage(avatarImg,
        canvas.width - avatarImg.width * 1.3,
        canvas.height - avatarImg.height * 1.1,
        avatarImg.width, avatarImg.height
    );

}

function clearAnimationAndStartGame() {
    hide(buttonDiv);
    hide(devBtn);
    animationOn = false;
    cancelAnimationFrame(animationId);
    startNewGame();

}
get('startGameBtn').addEventListener('click', clearAnimationAndStartGame);

get('howToPlayBtn').addEventListener('click', () => show(howToPlayOverlay) );

get('aboutBtn').addEventListener('click', () => show(aboutOverlay) );

devBtn.addEventListener('click', () => show(developerOverlay));

for (let i = 0; i < jsonLevels.length; i++) {
    const elem = document.createElement('li');
    elem.innerText = i + 1;
    elem.addEventListener('click', () =>{
        setLevelIndex(i);

        hide(developerOverlay);
        // startNewGame();
        clearAnimationAndStartGame();
    });
    get('devLevelSelect').appendChild(elem);
}


//variables for largest possible circle radius, fastest possible speed and circles array
const largestRadius = UNIT * 2.7;
const fastestSpeed = UNIT / 3.375;
let circles = [];

class Circle {
    constructor(x, y, radius, color, incrementX, incrementY) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.incrementX = incrementX;
        this.incrementY = incrementY;
    }


    //check for a collision before redrawing the circle
    draw() {
        this.checkCollision();
        this.x += this.incrementX;
        this.y += this.incrementY;

        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }

    //check for collision with one of the walls. x and y coordinates are the circle's center
    //so there is a need to add or subtract the radius
    checkCollision() {
        if (this.x + this.radius >= width || this.x - this.radius <= 0) {
            this.incrementX = -this.incrementX;
        }
        if (this.y + this.radius >= height || this.y - this.radius <= 0) {
            this.incrementY = -this.incrementY;
        }
    }

    update() {
        this.draw();
    }
}

//get a random starting point for the center of the circle.
//the calculation is to ensure that the starting center point of the ball will never be too close to
//the edge, which would prevent the ball from leaving that position. "too close" means within a distance
//of the "largestRadius", which is the largest possible radius of any ball.
function randomPoint(range) {
    return Math.floor(Math.random() * (range - (largestRadius * 2)) + (largestRadius));
}

function randomRadius() {
    return Math.floor(Math.random() * (largestRadius - 25)) + 25;
}

//random color generator. we are using opacity here. current calculation ensures that opacity should 
//never be lower than 0.5
function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const op = Math.random() * 0.5 + 0.5;
    return `rgba(${r},${g},${b},${op})`;
}

//controls the speed and starting direction. 
function randomIncrementer() {
    const plusMinus = Math.random() < 0.5 ? 1 : -1;
    return plusMinus * (Math.random() * fastestSpeed);
}

//function to create new circle and add it to the circle array
function newCircle() {
    const circle = new Circle(randomPoint(width), randomPoint(height), randomRadius(),
        randomColor(), randomIncrementer(), randomIncrementer());
    circles.push(circle);
}

for (let i = 0; i < 50; i++) {
    newCircle();
}
export function startAnimation() {
    animationOn = true;
    show(buttonDiv);
    show(devBtn);
    animate();
}

bgImg.onload = startAnimation();


//control the popup boxes
get('howToPlayExit').addEventListener('click', () => hide(howToPlayOverlay));

get('aboutExit').addEventListener('click', () => hide(aboutOverlay) );

get('developerExit').addEventListener('click', () => hide(developerOverlay));