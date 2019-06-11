
class Data{
  constructor(min, max, guesses, name){
    this.minData = min;
    this.maxData = max;
    this.guessesData = guesses;
    this.nameData = name;
  }
}

class Store{
  static getData(){
    let data;
    if(localStorage.getItem('data') === null){
      data = []; // put here default data min=1 max=100 etc...
    } else {
      data = JSON.parse(localStorage.getItem('data'));
    }

    return data;
  }

  static displayData(){
    const data = Store.getData();

    data.forEach(function(singleData){
      console.log(singleData);
      // for now only in console
    
      
    });
  }

  static addData(singleData){
    // delete previous data.. 
    localStorage.removeItem('data');


    // set new data into LocalStore
    const data = Store.getData();

    data.push(singleData);

    localStorage.setItem('data', JSON.stringify(data));
  }

  static removeData(isbn){
    const books = Store.getBooks();
    localStorage.getItem('data') === null;

    /*
    books.forEach(function(book, index){
     if(book.isbn === isbn){
       books.splice(index, 1);
     }
    });
    */
    localStorage.setItem('books', JSON.stringify(books));
  }

}


document.getElementById('submit-custom-data').addEventListener('click', function(e){
  
  // Quick form validation on submit
  // check if inputs does not have error classes
  // element.classList.contains(class);

  const minInput = document.querySelector('#guest-guess-input-min');
  const maxInput = document.querySelector('#guest-guess-input-max');
  const guessesInput = document.querySelector('#guest-guesses-input');
  const nameInput = document.querySelector('#guest-name-input');


  if( (minInput.classList.contains('is-invalid')) || 
      (maxInput.classList.contains('is-invalid')) ||
      (guessesInput.classList.contains('is-invalid')) ||
      (nameInput.classList.contains('is-invalid')) ||
      (minInput.value == '') || (maxInput.value == '') || (guessesInput.value == '') || (nameInput.value == ''))
      {
    // Error alert
    console.log('Problem');
    // create paragraph which tells the user that something went wrong and has to re-check the input fields
    e.preventDefault();

  } else {

    // get form values
    const minData = document.querySelector('#guest-guess-input-min').value;
    const maxData = document.querySelector('#guest-guess-input-max').value;
    const guessesData = document.querySelector('#guest-guesses-input').value;
    const nameData = document.querySelector('#guest-name-input').value;
    

    const data = new Data(minData, maxData, guessesData, nameData);

    Store.addData(data);

    Store.displayData(data);

    e.preventDefault();
  }

});



/* for testing purposes */
document.querySelector('.test').addEventListener('click', function(e){

  const data = Store.getData();

  Store.displayData(data);

  e.preventDefault();
});


/*
clearFields(){
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
  document.getElementById('title').focus();
}
*/