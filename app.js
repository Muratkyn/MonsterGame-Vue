function getRandomVal(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      clickCount: 0,
      enableButton: true,
      winner: null,
    };
  },
  watch: {
    clickCount(val) {
      if (val > 0 && val % 4 === 0) {
        return (this.enableButton = false);
      }
      return (this.enableButton = true);
    },
    playerHealth(val) {
      if (val <= 0 && this.monsterHealth <= 0) {
        this.winner = "Draw";
      } else if (val <= 0) {
        this.winner = "Monster";
      }
    },
    monsterHealth(val) {
      if (val <= 0 && this.playerHealth <= 0) {
        this.winner = "Draw";
      } else if (val <= 0) {
        this.winner = "Player";
      }
    },
  },
  computed: {
    monsterBarStyle() {
      if (this.monsterHealth < 0) {
        return { width: 0 };
      }
      return { width: `${this.monsterHealth}%` };
    },
    playerBarStyle() {
      if (this.playerHealth < 0) {
        return { width: 0 };
      }
      return { width: `${this.playerHealth}%` };
    },
  },
  methods: {
    attackMonster() {
      const playerAttack = getRandomVal(5, 15);
      // console.log("player attack", playerAttack);
      this.monsterHealth -= playerAttack;
      this.attackPlayer();
      this.clickCount++;
    },

    attackPlayer() {
      const monsterAttack = getRandomVal(5, 17);
      console.log("monster atttack", monsterAttack);
      this.playerHealth -= monsterAttack;
    },

    specialAttack() {
      const specAttack = getRandomVal(8, 20);
      // console.log("player attack", specAttack);
      this.monsterHealth -= specAttack;
      this.clickCount++;
    },
    healPlayer() {
      const healNumber = getRandomVal(8, 20);
      console.log("player healed", healNumber);
      this.clickCount++;
      this.attackPlayer();
      if (this.playerHealth + healNumber > 100) {
        return (this.playerHealth = 100);
      }
      return (this.playerHealth += healNumber);
    },
    startNewGame() {
      this.monsterHealth = 100;
      this.playerHealth = 100;
      this.clickCount = 0;
      this.winner = null;
    },
    surrender() {
      this.playerHealth = 0;
      this.winner = "Monster";
    },
  },
});

app.mount("#game");
