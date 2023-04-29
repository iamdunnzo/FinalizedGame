//global variable 
const GAME_TIME_IN_SECONDS = 60;

// Wait for the page to finish loading
document.addEventListener("DOMContentLoaded", function () {
  // Select the elements to use in the game
  const wordDisplay = document.querySelector("#word-display");
  const inputField = document.querySelector("#input-field");
  const startButton = document.querySelector("#start-btn");
  const restartButton = document.querySelector("#restart-btn");
  const scoreDisplay = document.querySelector("#score-display");
  const timeDisplay = document.querySelector("#time-display");

  class Game {
    constructor() {
      // Initialize the game state
      this.words = ["apple", "banana", "cherry", "orange", "grape", "pear", "kiwi", "plum", "mango", "peach", "grapefruit", "blueberry", "lemon", "strawberry"];
      this.currentWord = "";
      this.score = 0;
      this.time = GAME_TIME_IN_SECONDS;
      this.timer = null;
      console.log("Here");
      console.log(GAME_TIME_IN_SECONDS);
      console.log(this.time);
    }

    startGame() {
      // Start the game by generating a word and setting a timer
      console.log("gameStarted");
      this.generateWord();
      this.timer = setInterval(() => {
        console.log("setInterval");
        this.updateTime();
      }, 1000);
    }

    generateWord() {
      // Choose a random word from the list of words and display it
      console.log("generateWord");
      const randomIndex = Math.floor(Math.random() * this.words.length);
      this.currentWord = this.words[randomIndex];
      console.log(`currentWordIs: ${this.currentWord}`);
      wordDisplay.textContent = this.currentWord;
    }

    checkInput() {
      // Check if the user's input matches the current word
      const input = inputField.value.trim().toLowerCase();

      if (input === this.currentWord) {
        // If the input is correct, update the score, display the next word, and add the "correct" class
        wordDisplay.classList.add("correct");
        setTimeout(() => {
          wordDisplay.classList.remove("correct");
          this.generateWord();
        }, 1000);
        this.score++;
        scoreDisplay.textContent = this.score;
      } else {
        // If the input is incorrect, subtract from the score, add the "incorrect" class, and display an alert if the score goes below 0
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
      // Clear the input field
      inputField.value = "";
    }

    updateTime() {
      // Update the time every second and display it on the screen
      console.log("updateTime");
      this.time--;

      if (this.time <= 0) {
       // If the time runs out, display a congratulatory or losing alert, and disable the input field and start button
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
       // Otherwise, display the remaining time
        timeDisplay.textContent = this.time;
      }
    }

    restartGame() {
      // Reset the game state to its initial values and clear the timer
      console.log("gameRestarted");
      this.score = 0;
      this.time = GAME_TIME_IN_SECONDS;
      scoreDisplay.textContent = this.score;
      timeDisplay.textContent = this.time;
      inputField.disabled = true;
      restartButton.disabled = false;
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
    restartButton.disabled = false;
  });

  inputField.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
      game.checkInput();
    }
  });
      console.log("add event listener");
  restartButton.addEventListener("click", () => {
    console.log("restart clicked");
    game.restartGame();
  });
});
