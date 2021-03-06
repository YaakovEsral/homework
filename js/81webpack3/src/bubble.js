// vy range is from 5.5 (lowest) to 11- (highest) when UNIT is 40~41

export const bubbleTypes = [
    {
        type: 1,
        radiusFactor: 5.5, // results in radius of 7.5 when UNIT/radiusFactor and UNIT is 41
        velocityFactor: 7.45 // results in yVelocity of 5.5 when UNIT/velocityFactor and UNIT is 41
    },

    {
        type: 2,
        radiusFactor: 2.73, //15,
        velocityFactor: 6.3 // 6.5
    },
    {
        type: 3,
        radiusFactor: 1.64, //25,
        velocityFactor: 5.5 // 7.5
    },
    {
        type: 4,
        radiusFactor: 1.17, //35,
        velocityFactor: 5.25 // 7.8
    },
    {
        type: 5,
        radiusFactor: 0.91, //45,
        velocityFactor: 5.125 //8
    },
    {
        type: 6,
        radiusFactor: 0.745, //55,
        velocityFactor: 4.71 // 8.7
    },
    {
        type: 7,
        radiusFactor: 0.63, //65,
        velocityFactor: 4.31 //9.5
    }
];

export class Bubble {
    // static velocityFactor = 7.45; //not allowed with webpack until we get babel set up

    constructor(fieldData, obj, UNIT) {
        this.field = fieldData.field;
        this.ctx = fieldData.ctx;
        // this.radius = obj.radius;
        this.type = obj.type;
        this.radius = UNIT / bubbleTypes[this.type - 1].radiusFactor; //offset -1 to get the proper index

        this.x = obj.x || this.radius * 2;
        this.y = obj.y || this.field.height / 2;

        //enable the user to pass in an offset value to position each bubble
        if (obj.offset && obj.offset.left === true) {
            this.x = obj.offset.val * this.x;
        } else if (obj.offset && !obj.offset.left) {
            this.x = this.field.width - obj.offset.val * this.x;
        }

        this.velocityX = obj.velocityX || UNIT / 20.5; //was 2 with UNIT 41
        this.velocityY = obj.velocityY || 0;
        
        //user can choose to start the direction going left
        if(obj.dirLeft){
            this.velocityX *= -1;
        }

        this.gravity = UNIT / 410; //was 0.1 with UNIT 41
        this.maxBounceYVelocity = UNIT / (obj.maxBounceYVelocity || bubbleTypes[this.type - 1].velocityFactor); //offset -1 to get the proper index
        // this.maxBounceYVelocity = UNIT / 7.45; //was 5.5 with UNIT 41
        this.hitStatus = false;

        this.color = obj.bubbleColor;
        // this.incrementX = obj.incrementX;
        // this.incrementY = obj.incrementY;
    }


    //check for a collision before redrawing the bubble
    draw() {
        this.checkWallCollision();
        this.velocityY += this.gravity;
        this.x += this.velocityX;
        this.y += this.velocityY;

        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();
    }

    //check for collision with one of the walls. x and y coordinates are the circle's center
    //so there is a need to add or subtract the radius
    checkWallCollision() {
        //sideways collision
        if (this.x + this.radius >= this.field.width || this.x - this.radius <= 0) {
            this.velocityX = -this.velocityX;
        }
        //floor collision
        if (this.y + this.radius >= this.field.height) {
            this.velocityY = -this.maxBounceYVelocity;
        }
    }

    checkBeamCollision(beam) {
        // let hitStatus = false;
        //could be this algo needs work
        if (beam.x > this.x - this.radius &&
            beam.x + beam.width < this.x + this.radius &&
            beam.yTop < this.y + this.radius &&
            beam.yBottom > this.y - this.radius
        ) {
            this.hitStatus = true;
        }
        return this.hitStatus;
    }

    checkCeilingCollision() {
        if (this.y - this.radius <= 0) {
            this.hitStatus = true;
        }
        return this.hitStatus;
    }

    update() {
        this.draw();
    }
}