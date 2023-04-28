document.addEventListener("DOMContentLoaded", function () {
  const wordDisplay = document.querySelector("#word-display");
  const inputField = document.querySelector("#input-field");
  const startButton = document.querySelector("#start-btn");
  const restartButton = document.querySelector("#restart-btn");
  const scoreDisplay = document.querySelector("#score-display");
  const timeDisplay = document.querySelector("#time-display");

  class Game {
    constructor() {
      this.words = ["apple", "banana", "cherry", "orange", "grape"];
      this.currentWord = "";
      this.score = 0;
      this.time = 60;
      this.timer = null;
    }

    startGame() {
      console.log("gameStarted");
      this.generateWord();
      this.timer = setInterval(() => {
        console.log("setInterval");
        this.updateTime();
      }, 1000);
    }

    generateWord() {
      console.log("generateWord");
      const randomIndex = Math.floor(Math.random() * this.words.length);
      this.currentWord = this.words[randomIndex];
      console.log(`currentWordIs: ${this.currentWord}`);
      wordDisplay.textContent = this.currentWord;
    }

    checkInput() {
      const input = inputField.value.trim().toLowerCase();

      if (input === this.currentWord) {
        wordDisplay.classList.add("correct");
        setTimeout(() => {
          wordDisplay.classList.remove("correct");
          this.generateWord();
        }, 1000);
        this.score++;
        scoreDisplay.textContent = this.score;
      } else {
        wordDisplay.classList.add("incorrect");
        setTimeout(() => {
          wordDisplay.classList.remove("incorrect");
        }, 1000);
        this.score--;
        scoreDisplay.textContent = this.score;
        if (this.score < 0) {
          clearInterval(this.timer);
          inputField.disabled = true;
          startButton.disabled = true;
          restartButton.disabled = false;
          alert("Game over, you lost.");
        }
      }

      inputField.value = "";
    }

    updateTime() {
      console.log("updateTime");
      this.time--;

      if (this.time <= 0) {
        clearInterval(this.timer);
        inputField.disabled = true;
        startButton.disabled = true;
        restartButton.disabled = false;

        if (this.score >= 10) {
          alert("Congratulations, you won!");
        } else {
          alert("Game over, you lost.");
        }
      } else {
        timeDisplay.textContent = this.time;
      }
    }

    restartGame() {
      console.log("gameRestarted");
      this.score = 0;
      this.time = 60;
      scoreDisplay.textContent = this.score;
      timeDisplay.textContent = this.time;
      inputField.disabled = true;
      restartButton.disabled = true;
      startButton.disabled = false;
      wordDisplay.textContent = "";
      clearInterval(this.timer);
    }
  }

  const game = new Game();

  startButton.addEventListener("click", () => {
    game.startGame();
    inputField.disabled = false;
    startButton.disabled = true;
    restartButton.disabled = true;
  });

  inputField.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
      game.checkInput();
    }
  });

  restartButton.addEventListener("click", () => {
    game.restartGame();
  });
});