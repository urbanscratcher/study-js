'use strict';

/* 
// 72. SELECTING AND MANIPULATING ELEMENTS
console.log(document.querySelector(`.message`).textContent);

document.querySelector(`.message`).textContent = `🎉 Correct Number!`;

console.log(document.querySelector(`.message`).textContent);

document.querySelector(`.number`).textContent = 13;
document.querySelector(`.score`).textContent = 10;

document.querySelector(`.guess`).value = 23;
console.log(document.querySelector(`.guess`).value);
*/

//  73-78.

const displayMessage = function (message) {
  document.querySelector(`.message`).textContent = message;
};

const displayNumber = function (secretNumber) {
  document.querySelector(`.number`).textContent = secretNumber;
};

const displayScore = function (score) {
  document.querySelector(`.score`).textContent = score;
};

const calcSecretNumber = function () {
  return Math.trunc(Math.random() * 20) + 1;
};

let secretNumber = calcSecretNumber();
let score = 20; // a state variable (updated)
let highscore = 0;

document.querySelector(`.check`).addEventListener(`click`, function () {
  const guess = Number(document.querySelector(`.guess`).value);

  //   console.log(guess, typeof guess);

  //   When there is no input - check 0(fallcy value)
  if (!guess) {
    displayMessage(`❌ No number!`);

    // When player wins
  } else if (guess === secretNumber) {
    displayNumber(secretNumber);
    displayMessage(`🎉 Correct Number!`);
    document.querySelector(`body`).style.backgroundColor = `#60b347`;
    document.querySelector(`.number`).style.width = `30rem`;

    if (score > highscore) {
      highscore = score;
      document.querySelector(`.highscore`).textContent = highscore;
    }

    // When guess is wrong
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? `↗ Too high!` : `↘ Too low!`);
      score--;
      displayScore(score);
    } else {
      displayMessage(`💥 You lost the game!`);
      displayScore(0);
    }
  }
});

document.querySelector(`.again`).addEventListener(`click`, function () {
  score = 20;
  secretNumber = calcSecretNumber();
  //   document.querySelector(`.score`).textContent = 20;

  displayMessage(`Start guessing...`);
  displayScore(score);
  displayNumber(`?`);
  document.querySelector(`.guess`).value = ``;

  document.querySelector(`body`).style.backgroundColor = `#222`;
  document.querySelector(`.number`).style.width = `15rem`;
});
