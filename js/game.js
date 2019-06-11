// [ok] validate new data using Regular Expressions
// [ok] save user's new data to local storage
// [ok] put user's data from local storage into game, if it is set
// [ok] make refresh after user provide new data into local storage
// [solved] hide name-input in form if the user has put his name already
//    but also add a button to show the input
// [] refactor the code


// CSS
// [ok] make a pop-up button that opens a form 







// Game values
let min,
    max,
    winningNum,
    guessesLeft,
    name;

// used for hints
let lower, 
upper;
  
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
      guestName = document.querySelector('.guestName');
document.querySelector('div[type=button]').style.pointerEvents = "none"; // disable the guess counter button  




/*                      GAME-on                        */


//focus input on when page load
document.addEventListener("DOMContentLoaded", () => {

  //get data
  data = Store.getData();

  // local storage if not set
  if(localStorage.getItem('data') === null){
    // standard game values
    console.log('standard');

    min = 1,
    max = 100,
    guessesLeft = 5,
    name = 'guest';

    lower=min;
    upper=max;

  } else{
    // user's game values
   
    // get user's values from LS
    data = Store.getData();

    //Store.displayData();
    min = data[0].minData;
    max = data[0].maxData;
    guessesLeft = data[0].guessesData;
    name = data[0].nameData;

    lower=min;
    upper=max;

  }
  guestName.textContent = `Hello ${name.toUpperCase()} !`;    // set guest's name
  guessesCounter.textContent = guessesLeft;   // set guesses counter

  // Assign UI min and max
  minNum.textContent = min;
  maxNum.textContent = max;
  winningNum = getRandomNum(min, max),

// Set number range hint
messageThree.textContent = '';
let threeContent = `your number is between ${min} and ${max}`;
messageThree.textContent = threeContent;


  // console.log(min, max);
  // console.log(winningNum);
  guessInput.focus();
})



// Clear modal inputs on clicking close button
document.querySelector('.close-modal').addEventListener('click', clearInputForm);


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
    guessInput.value = '';
    return null;
  }


  // check if won
  if(guess === winningNum){
  gameOver(true, `${winningNum} is correct, You WIN!`);
  // hide parahraphs and counter button
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
      messageTwo.style.color ="#dbd032";
      messageTwo.textContent = hint;
      
    }
  }

})

//submit number on enter hit
guessInput.addEventListener("keyup", function(e) {
  if (e.keyCode === 13) {
    guessBtn.click();
  }
});






// FUNCTIONS for Actual game

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

  // Play again?
  guessBtn.value = 'Play Again';
  guessBtn.classList.add('play-again');
}

// get random number as a winning number
function getRandomNum(min, max){
  
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min +1)) + min;

  //return Math.floor( Math.random()*(max-min+1)+min );
  //return Math.floor(Math.random() * max) + min  
}

// set message function
function setMessage(msg, color){
  message.style.color = color;
  message.textContent = msg;
}


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

// Clear inputs in form

function clearInputForm(){

  const minInput = document.querySelector('#guest-guess-input-min');
  const maxInput = document.querySelector('#guest-guess-input-max');
  const guessesInput = document.querySelector('#guest-guesses-input');
  const nameInput = document.querySelector('#guest-name-input');

  minInput.value = '';
  minInput.classList.remove('is-invalid');
  maxInput.value = '';
  maxInput.classList.remove('is-invalid');
  guessesInput.value = '';
  guessesInput.classList.remove('is-invalid');
  nameInput.value = '';
  nameInput.classList.remove('is-invalid');

}

// prevent exiting form modal by click outside of it
$('#exampleModal').modal({
  backdrop: 'static', 
  keyboard: false, 
  show: false
});  
// backdrop: static -> doesn't close the modal when clicking outside of it
// keyboard: false -> doesnt' close the modal on ESC press
// show: false -> doesn't open up when page loads



// Put name if set
document.querySelector('.open-modal-button').addEventListener('click', function(){
  //get data
  data = Store.getData();
  console.log(data[0].nameData);
  document.getElementById('guest-name-input').value = data[0].nameData;
})