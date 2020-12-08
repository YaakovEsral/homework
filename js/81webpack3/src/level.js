export class Level{

    constructor(obj){
        this.bgImg = new Image();
        this.bgImg.src = obj.bgImgSrc;
        this.bubbles = obj.bubbles;
        this.timeFactor = obj.timeFactor;
    }
}