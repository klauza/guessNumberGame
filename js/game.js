


/*
Game function
- player must guess a number between a min and max
- player getrs a certain amount of guesses
- notify player of guesses remaining
- notify the player of the correct answer if loose
- let player choose to play again
*/

// Game values
let min = 1,
    max = 100,
    winningNum = getRandomNum(min, max),
    guessesLeft = 5;

let lower=min, 
upper=max;
  

// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');
      messageTwo = document.querySelector('.messageTwo');
      
      guessesCounter = document.querySelector('.guess-left');
      messageThree = document.querySelector('.messageThree');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// set guesses counter
guessesCounter.textContent = guessesLeft;

//focus input on when page load
document.addEventListener("DOMContentLoaded", () => {
  guessInput.focus();
 
})


// Play again event listener
game.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-again'){
    window.location.reload();

  }
})


// Listen for guess
guessBtn.addEventListener('click', function(){
  // console.log(guessInput.value); // it's text
  // console.log(parseInt(guessInput.value)); // it's a number | NaN if input empty
  // so need to check for that (validate)
  let guess = parseInt(guessInput.value);

  setHintRange(guess);

  // Validate
  if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    return null;
  }


  // check if won
  if(guess === winningNum){
  gameOver(true, `${winningNum} is correct, You WIN!`);
  messageTwo.textContent = '';
  messageThree.textContent = '';
    
  } else {
    // Wrong number
    guessesLeft -= 1;
    guessesCounter.textContent = guessesLeft;

    if(guessesLeft === 0){
      //Game is lost
      messageTwo.textContent = '';
      messageThree.textContent = '';
      gameOver(false, `Game over, you lost. The correct number was ${winningNum}`)
      
    } else {
      //Game continues - answer wrong
      //guessInput.style.borderColor = 'red';
      //clear input
      guessInput.value = '';
      setMessage(`${guess} is not correct`, 'white');

      // hint
      let hint;
      guess >= winningNum ? hint = 'The number is lower' : hint = 'The number is higher';
      messageTwo.style.color ="white";
      messageTwo.textContent = hint;
      
    }
  }
  
})

// FUNCTIONS

// Game over
function gameOver(won, msg){
  let color;
  won === true ? color = 'green' : color = 'red';
  // disable input
  guessInput.disabled = true;
  //change border color
  guessInput.style.borderColor = color;
  message.style.color = color;

  // set winning message
  setMessage(msg);
  

  //Play again?
  guessBtn.value = 'Play Again';
  guessBtn.classList.add('play-again');
}

// get random number as a winning number
function getRandomNum(min, max){
  return Math.floor(Math.random()*(max-min+1)+min);
}

// set message function
function setMessage(msg, color){
  message.style.color = color;
  message.textContent = msg;
}

//submit number on enter hit
guessInput.addEventListener("keyup", function(e) {
  if (e.keyCode === 13) {
    guessBtn.click();
  }
});


// Set number range hint
messageThree.textContent = '';
let threeContent = `your number is between ${min} and ${max}`;
messageThree.textContent = threeContent;

function setHintRange(guess){
  
  // Set lower range-number
  if(guess > lower && guess < winningNum){
    lower = guess;
    messageThree.textContent = `your number is between ${lower} and ${upper}`;
  } else 
    // Set higher range-number
    if(guess < upper && guess > winningNum){
      upper = guess;
      messageThree.textContent = `your number is between ${lower} and ${upper}`;
    } else {
      return null
      }
}


// Add ability to put own number of range-guess


