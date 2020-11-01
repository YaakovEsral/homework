(function (){
    'use strict';

    class Vehicle {
        constructor(color){
            this.color = color;
            this.speed = 'default speed of ZERO';
        }

        go(speed){
            this.speed = speed;
            console.log('now going at', this.speed);
        }

        print(){
            console.log(`color is ${this.color}, speed is ${this.speed}`);
        }
    }


    class Plane extends Vehicle{
        constructor(color){
            super(color);
            this.speed = 'default speed of ZERO';
        }

        go(speed) {
            this.speed = speed;
            console.log('now FLYING at', this.speed);
        }


    }

    const v1 = new Vehicle('green');
    const p1 = new Plane('blue and yellow');

    v1.go(55);
    v1.print();
    p1.go(600);
    p1.print();
    console.log(v1);
    console.log(p1);
}());