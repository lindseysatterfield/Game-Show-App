// VARIABLES
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
let missed = 0;
let hearts = document.querySelectorAll('.tries img');
const overlay = document.getElementById('overlay');
const start = document.querySelector('.btn__reset');
const title = document.querySelector('.title');
const phrases = [
  'when pigs fly',
  'break a leg',
  'back to square one',
  'see eye to eye',
  'a piece of cake',
  'two birds with one stone'
];
const buttons = document.getElementsByTagName('button');
const letter = document.getElementsByClassName('letter');
const show = document.getElementsByClassName('show');
const ul = document.getElementsByTagName('ul')[0];

// ------------------------------------------------------------------- //

// FUNCTIONS
const getRandomPhraseAsArray = (arr) => {
  let randomPhrase = arr[Math.floor(Math.random() * arr.length)];
  return randomPhrase.split('');
  // splits phrases
}

const addPhraseToDisplay = (arr) => {
  // do stuff any arr that is passed in, and add to #phrase ul
  for (i = 0; i < arr.length; i++) {
    const ul = document.querySelector('#phrase ul');
    let li = document.createElement('li');
    li.textContent = arr[i];
    ul.appendChild(li);
    if (arr[i] != ' ') {
      li.className = 'letter';
    } else {
      li.className = 'space';
    }
  }
}

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray); 
// appends to game display

const checkLetter = (button) => {
  // checks for letter matches
	let match = null;
	for (let i = 0; i < letter.length; i++) {
	    if (button.textContent === letter[i].textContent) {
	        letter[i].classList.add('show');
	        match = true;
	    }
	}
	return match;
}

const checkWin = () => {
  // checks to see if user key matches the correct letter
  if (show.length === letter.length) {
    setTimeout(() => {
    title.textContent = 'You are a winner!';
		start.textContent = 'Play Again!';
		overlay.style.display = 'flex';
    overlay.classList.add('win');
    console.log('winner');
    reset();
    }, 1300);
    } else if (missed >= 5) {
        setTimeout(() => {
        title.textContent = 'You Lose! Try again!';
        start.textContent = 'Start a new game!';
        overlay.style.display = 'flex';
        overlay.classList.add('lose');
        console.log('loser');
        reset();
        }, 1300);
      }
    }

const reset = () => {
  // resets the game board
  start.addEventListener('click', () => {
    overlay.style.display = 'none';  
    overlay.classList.remove('lose');
    overlay.classList.remove('win');
  });
  missed = 0;
  const board = document.querySelectorAll('.space, .letter');
  for (let i = 0; i < board.length; i++) {
    ul.removeChild(board[i]);
  }
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].className = "";
    buttons[i].disabled = false;
  }
  const phraseArray = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(phraseArray); 
  hearts.forEach((img) => {
    // resets the hearts
    img.src = 'images/liveHeart.png';
    });
}

// ------------------------------------------------------------------- //

// BEGIN GAME
start.addEventListener('click', () => {
  overlay.style.display = 'none';
  // hides the start screen overlay
});

qwerty.addEventListener('click', (e) => {
// when user clicks a key to match with phrase
  if (e.target.tagName === 'BUTTON') {
    e.target.classList.add('chosen');
    e.target.disabled = true; 
    let letterFound = checkLetter(e.target);
  if (letterFound) {
    checkWin();
  } else if (!letterFound) {
      missed += 1;
      let lostHearts = document.querySelectorAll(".tries img")[missed - 1];
      lostHearts.src = "images/lostHeart.png";
      checkWin();
    }
  }
});