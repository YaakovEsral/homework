// import avatarImgSrc from './images/avatar.png';

const avatarImg = new Image();
// avatarImg.src = avatarImgSrc;
avatarImg.src = './images/avatar.png';

class Avatar {
    constructor(field, UNIT){
        // this.canvas = canvas;
        this.field = field;
        this.img = avatarImg;
        this.movePlusMinus = 0;
        this.moveIncrement = UNIT / 10;//6.67; //may want to make him slower eventually
        this.width = UNIT * 2;
        this.height = UNIT * 3;
        this.x = (this.field.width / 2) - UNIT;
        this.y = this.field.height - (UNIT * 3);
        this.midpoint = function () { return this.x + (this.width / 2) };
        this.hitOffset = UNIT / 3.85;
        this.gotHit = false;

        this.beam = {
            width: UNIT / 6.83,  //6 when UNIT = 41
            x: undefined,
            yTop: this.y, //refers to the Avatar's y
            yBottom: field.height,
            shooting: false,
            color: '#363a42',
            // color: '#059ee6',
            increment: UNIT / 9// 10.25
            // , 
            // reset: reset
        };
    }    
    
    move() {
        if (this.x + this.width <= this.field.width && this.movePlusMinus === 1) {
            this.x += (this.moveIncrement * this.movePlusMinus);
        }
        else if (this.x >= 0 && this.movePlusMinus === -1) {
            this.x += (this.moveIncrement * this.movePlusMinus);
        }

        
        // console.log(avatar.x);
    }
    
    shoot() {
        if (this.beam.shooting) {
            return;
        }
        this.beam.x = this.midpoint();
        // console.log('avatar shooting');
        this.beam.shooting = true;
        // this.beam.reset();
    }

    resetBeam(){
        this.beam.shooting = false;
        this.beam.yTop = this.y; //Avatar's height
        this.beam.yBottom = this.field.height;   
    }
}

// function reset() {
//     console.log('reset outside Avatar class');
// }

export {Avatar};