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
  'a piece of cake'
];
const letter = document.getElementsByClassName('letter');
const show = document.getElementsByClassName('show');

start.addEventListener('click', () => {
  overlay.style.display = 'none';
  // hides the start screen overlay
});

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
  if (show.length === letter.length) {
    title.textContent = 'You are a winner!';
		start.textContent = 'Start a new game!';
		overlay.style.display = 'flex';
    overlay.classList.add('win');
    console.log('winner');
    } else if (missed >= 5) {
        title.textContent = 'Try again next time!';
        start.textContent = 'Start a new game!';
        overlay.style.display = 'flex';
        overlay.classList.add('lose');
        console.log('loser');
  }
}

qwerty.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    e.target.classList.add('chosen');
    e.target.disabled = true; 
  }
  let letterFound = checkLetter(e.target);
  if (letterFound) {
    checkWin();
    start.addEventListener('click', () => {
      window.location.reload();
    });
  } else if (!letterFound) {
      missed += 1;
      let lostHearts = document.querySelectorAll(".tries img")[missed - 1];
      lostHearts.src = "images/lostHeart.png";
      checkWin();
      start.addEventListener('click', () => {
        window.location.reload();
      });
    }
});



