/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var vm = new Vue({
  el: '#app',
  data: {
    player1: 100,
    player2: 100,
    isGameStarted: false,
    attackStrength: 10,
    specialAttackStrength: 20,
    healStrength: 7,
    attackLog: []
  },
  computed: {
    player1Style: function () {
      return {
        width: this.player1 + '%'
      }
    },
    player2Style: function () {
      return {
        width: this.player2 + '%'
      }
    }
  },
  methods: {
    startGame: function () {
      this.isGameStarted = true;
    },
    endGame: function () {
      let result = confirm('do you really want to exit?');
      if (result === true) {
        this.isGameStarted = false;
      }
    },
    attack: function () {
      let attackStrength = getRandomInt(1, this.attackStrength);
      this.player2 -= attackStrength;
      this.attackLog.unshift(`you did an attack to the monster of strength ${attackStrength}`)

      this.monsterMove();
    },
    specialAttack: function () {
      let attackStrength = getRandomInt(1, this.specialAttackStrength);
      this.player2 -= attackStrength;
      this.attackLog.unshift(`you did a special attack to the monster of strength ${attackStrength}`)

      this.monsterMove();
    },
    heal: function () {
      let healStrength = getRandomInt(1, this.healStrength);
      this.player1 += healStrength;
      this.attackLog.unshift(`you healed of ${healStrength}`);
      this.monsterMove();
    },
    monsterMove: function () {
      let move = getRandomInt(0, 2);
      if (move === 0) {
        let monsterAttackStrength = getRandomInt(1, this.attackStrength);
        this.player1 -= monsterAttackStrength;
        this.attackLog.unshift(`the monster did a simple attack on you of strength ${monsterAttackStrength}`)
      }
      if (move === 1) {
        let monsterAttackStrength = getRandomInt(1, this.specialAttackStrength);
        this.player1 -= monsterAttackStrength;
        this.attackLog.unshift(`the monster did a Special attack on you of strength ${monsterAttackStrength}`)
      }
      if (move === 2) {
        let healStrength = getRandomInt(1, this.healStrength);
        this.player2 += healStrength;
        this.attackLog.unshift(`the monster healed of ${healStrength}`);
      }

      if (this.player1 <= 0 && this.player1 < this.player2) {
        this.player1 = 0;
        this.gameFinished("the monster");
      } else if (this.player2 <= 0 && this.player1 > this.player2) {
        this.player2 = 0;
        this.gameFinished("you");
      }
    },
    gameFinished: function (winner) {
      alert(`${winner} won !`);
      this.reset();
    },
    reset: function () {
      this.player1 = 100;
      this.player2 = 100;
      this.isGameStarted = false;
      this.attackStrength = 10;
      this.specialAttackStrength = 20;
      this.healStrength = 7;
      this.attackLog = [];
    }
  }
});