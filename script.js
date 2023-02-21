const text = document.getElementById('direction');
const translation = document.getElementById('translation');
const correctBtn = document.getElementById('correct');
let gameStarted = false;
let wordset;
let wordIndex;
let previousIndex;

fetch('./wordset.json')
  .then(response => response.json())
  .then(data => (wordset = data));

const showElement = className =>
  className.forEach(x => x.classList.remove('hide'));

const hideElement = className =>
  className.forEach(x => x.classList.add('hide'));

const randomWord = () => Math.floor(Math.random() * wordset.length);

const checkDirection = dir => {
  if (!gameStarted) return;

  if (dir === wordset[wordIndex].direction) {
    showElement([translation, correctBtn]);
  }
};

const generateWord = () => {
  // Prevent word from appearing twice in a row
  do {
    wordIndex = randomWord();
  } while (wordIndex === previousIndex);

  text.innerText = wordset[wordIndex].word;
  translation.innerText = wordset[wordIndex].translation;
  hideElement([translation, correctBtn]);
  previousIndex = wordIndex;
  gameStarted = true;
};
