(function (){
    'use strict';

    function Vehicle(color){
        this.color = color;
    }

    Vehicle.prototype.go = function (speed){
        this.speed = speed;
        console.log('now going at', speed);
    };

    Vehicle.prototype.print = function () {
        console.log(`color is ${this.color}, speed is ${this.speed}`);
    };

    function Plane(color){
        this.color = color;
    }

    Plane.prototype = Vehicle.prototype;

    Plane.prototype.go = function (speed) {
        this.speed = speed;
        console.log('now flying at', speed);
    };

    const hyundai = new Vehicle('red');
    hyundai.go(30);
    hyundai.print();

    const boeing = new Plane('blue');
    boeing.go(1000);
    boeing.print();
}());