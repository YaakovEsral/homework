(function () {
  'use strict';
  function get(id) {
    return document.getElementById(id);
  }

  const canvas = get('theCanvas');
  const createButton = get('createButton');
  const colorInput = get('colorInput');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class Ant {
    // # experimental private so no one can change it - but makes jshint very unhappy
    // static #SIZE = 2;

    // js hint not ready for this experimental syntax yet
    static SIZE = 2; // jshint ignore:line
    static FIGHTING_SIZE = 6;
    static FIGHTING_RANGE = 10;
    static ants = [];
    static id = 1;
    static ONE_SECOND = 1000;

    constructor(context, color = 'black') {
      this.x = canvas.width / 2;
      this.y = canvas.height / 2;
      this.color = color;
      this.id = Ant.id++;
      this.strength = Ant.getRandomNumber(1, 4);
      this.fightDelayTime = Ant.getRandomNumber(1, 10);
      this.size = Ant.SIZE;

      this.context = context;
      this.draw();

      this.fighting = false;
      this.initiator = true;
      this.beginFightMode();

      // setInterval(() => this.fight, 1);

      // static without using experimental syntax
      /*if (! Ant.SIZE) {
        Ant.SIZE = 2;
      }*/
    }

    draw() {
      this.context.beginPath();
      this.context.fillStyle = this.color;
      this.context.fillRect(this.x, this.y, this.size, this.size);
    }

    move() {
      this.x += Ant.getRandomNumber(-1, 1);
      this.y += Ant.getRandomNumber(-1, 1);

      if (this.x < Ant.SIZE) {
        this.x = Ant.SIZE;
      } else if (this.x > canvas.width - Ant.SIZE) {
        this.x = canvas.width - Ant.SIZE;
      }

      if (this.y < Ant.SIZE) {
        this.y = Ant.SIZE;
      } else if (this.y > canvas.height - Ant.SIZE) {
        this.y = canvas.height - Ant.SIZE;
      }

      this.draw();
    }

    beginFightMode() {
      this.color = 'orange';
      setTimeout(() => {
        // console.log('fighting');
        this.size = 6;
        this.fighting = true;
        this.initiator = false;
        this.detectOtherAnts();
      }, this.fightDelayTime * Ant.ONE_SECOND);
    }

    detectOtherAnts() {
      let opponent;
      for (let i = 0; i < Ant.ants.length; i++) {
        //if the other ant is within fighting range
        if (Ant.ants[i].x < this.x + Ant.FIGHTING_RANGE ||
          Ant.ants[i].x > this.x - Ant.FIGHTING_RANGE &&
          Ant.ants[i].y < this.y + Ant.FIGHTING_RANGE ||
          Ant.ants[i].y > this.y - Ant.FIGHTING_RANGE &&
          Ant.ants[i].fighting) { //and he is in fighting mode
          opponent = Ant.ants[i];
          break;
        }
      }

      this.initiator = true;
      opponent.initiator = false;
      opponent.fighting = true;
      this.fight(opponent);
    }

    fight(opponent) {
      this.color = 'red';

      if (this.initiator) {
        let winner;
        let loser;
        setTimeout(() => {
          if (this.strength === opponent.strength) {
            winner = this;
            loser = opponent;
          } else {
            winner = this.strength > opponent.strength ? this : opponent;
            loser = this.strength > opponent.strength ? opponent : this;
          }
          this.declareWinner(winner, loser);
        }, 2000);
      }

      //attempt to make a circle from which fighting ants cannot leave

      // const x = (this.x + opponent.x) / 2;
      // const y = (this.y + opponent.y) / 2;

      // const xDistance = Math.abs(this.x - opponent.x);
      // const yDistance = Math.abs(this.y - opponent.y);
      // const radius = Math.max(xDistance, yDistance);
      // // console.log(xDistance, yDistance, radius);

      // this.context.beginPath();
      // this.context.arc(x, y, radius, 0, Math.PI * 2);
      // this.context.stroke();
    }

    declareWinner(winner, loser) {
      winner.strength++;
      winner.size++;
      winner.color = 'black';
      winner.initiator = false;
      console.log('the winner was', winner);
      //remove the loser from the array, and thus, from the canvas
      Ant.ants.splice(Ant.ants.findIndex(ant => ant.id === loser.id), 1);
    }

    static getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
  }

  const context = canvas.getContext('2d');

  setInterval(() => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    Ant.ants.forEach(ant => ant.move());
  }, 100); //17);

  createButton.addEventListener('click', () => {
    Ant.ants.push(new Ant(context, colorInput.value));
  });

  for (let i = 0; i < 2000; i++) {
    Ant.ants.push(new Ant(context));
  }

  //Ant.SIZE = 10;
}());