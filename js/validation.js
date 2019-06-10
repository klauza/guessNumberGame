/* */
/* */
/*           new input data from user          */
/* */
/* */
/* */
/* */
document.querySelector('#guest-guess-input-min').addEventListener('blur', validateMin);
document.querySelector('#guest-guess-input-max').addEventListener('blur', validateMax);;
document.querySelector('#guest-guesses-input').addEventListener('blur', validateGuesses);
document.querySelector('#guest-name-input').addEventListener('blur', validateName);


function validateMin(){
  // current values
  const minInput = document.querySelector('#guest-guess-input-min');
  const maxInput = document.querySelector('#guest-guess-input-max');
  
  const re = /^[1-9]{1}(\d+)?/; // can't start with '0' and can be up to any number
  let minimum = parseInt(minInput.value);
  let maximum = parseInt(maxInput.value);


  if(!re.test(minInput.value)){
    minInput.classList.add('is-invalid');
  } 

  else if(maximum != NaN){      // dont check if max empty
    if(minimum >= maximum){     // cant be higher than max
      minInput.classList.add('is-invalid');
    } else{
      minInput.classList.remove('is-invalid');
      maxInput.classList.remove('is-invalid');
    }
  }

  else {
    minInput.classList.remove('is-invalid');
    maxInput.classList.remove('is-invalid');
  }
}


function validateMax(){
  //current values
  const minInput = document.querySelector('#guest-guess-input-min');
  const maxInput = document.querySelector('#guest-guess-input-max');
  
  const re = /^[1-9]{1}(\d+)?/; // can't start with '0' and can be up to any number
  let minimum = parseInt(minInput.value);
  let maximum = parseInt(maxInput.value);
  

  if(!re.test(maxInput.value)){
    maxInput.classList.add('is-invalid');
  } 

  else if(minimum != NaN){    // dont check if min empty
    if((minimum >= maximum) || (!re.test(minInput.value))){     // must check again if min is not 0
      maxInput.classList.add('is-invalid');
    } else { 
      maxInput.classList.remove('is-invalid');
      minInput.classList.remove('is-invalid');
    } 
  }

  else {
    maxInput.classList.remove('is-invalid');
    maxInput.classList.remove('is-invalid');
  }
}


function validateGuesses(){
  const guessesInput = document.querySelector('#guest-guesses-input');
  //let guesses = parseInt(guessesInput.value);
  const re = /^[1-9]{1}(\d+)?/;
  
  if(!re.test(guessesInput.value)){ 
    guessesInput.classList.add('is-invalid');
  } else {
    //it's valid!
    guessesInput.classList.remove('is-invalid');
  }
}

function validateName(){
  const nameInput = document.querySelector('#guest-name-input');

  const re = /^[a-z]{1,10}$/i; // max 10 chars

  console.log(nameInput.value);
  
  if(!re.test(nameInput.value)){ 
    nameInput.classList.add('is-invalid');
  } else {
    //it's valid!
    nameInput.classList.remove('is-invalid');
  }
}