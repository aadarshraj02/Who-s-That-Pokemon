const resultElement = document.querySelector("#result");
const pokemonImage = document.querySelector("#pokemon-image");
const optionsContainer = document.querySelector("#options");
const pointsElement = document.querySelector("#points-value");
const totalCount = document.querySelector("#total-count");
const mainContainer = document.getElementsByClassName("container");
const loadingContainer = document.querySelector("#loading-container");

let usedPokemonId = [];
let count = 0;
let points = 0;
let showLoading = false;

async function fetchPokemonById(id) {
  showLoading = true;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await response.json();
  return data;
}

function getRandomId() {
  return Math.floor(Math.random() * 151) + 1;
}

async function loadQuestionOption() {
  if ((showLoading = true)) {
    showLoadingWindow();
    hidePuzzleWindow();
  }
  let pokemonId = getRandomId();
  while (usedPokemonId.includes(pokemonId)) {
    pokemonId = getRandomId();
  }
  usedPokemonId.push(pokemonId);
  const pokemon = await fetchPokemonById(pokemonId);

  const options = [pokemon.name];
  const optionsIds = [pokemon.id];

  while (options.length < 4) {
    let randomPokemonId = getRandomId();
    while (optionsIds.includes(randomPokemonId)) {
      randomPokemonId = getRandomId();
    }
    optionsIds.push(randomPokemonId);

    const randomPokemon = await fetchPokemonById(randomPokemonId);
    const randomOption = randomPokemon.name;
    options.push(randomOption);

    if (options.length === 4) {
      showLoading = false;
    }
  }
  shuffleArray(options);
  resultElement.textContent = "Who's That Pokemon?";
  pokemonImage.src = pokemon.sprites.other.dream_world.front_default;
  optionsContainer.innerHTML = "";
  options.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.onclick = (event) => checkAnswer(option === pokemon.name, event);
    optionsContainer.appendChild(button);
  });

  if (!showLoading) {
    hideLoadingWindow();
    showPuzzleWindow();
  }
}
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function checkAnswer(isCorrect, event) {
  const selectedButton = document.querySelector(".selected");
  if (selectedButton) {
    return;
  }
  event.target.classList.add("selected");
  count++;
  totalCount.textContent = count;

  if (isCorrect) {
    displayResult("Correct Answer!");
    points++;
    pointsElement.textContent = points;
    event.target.classList.add("correct");
  } else {
    displayResult("Incorrect Answer...");
    event.target.classList.add("wrong");
  }
  setTimeout(() => {
    showLoading = true;
    loadQuestionOption();
  }, 1000);
}

function displayResult(result) {
  resultElement.textContent = result;
}
function hideLoadingWindow() {
  loadingContainer.classList.add("hide");
}

function showLoadingWindow() {
  mainContainer[0].classList.remove("show");
  loadingContainer.classList.remove("hide");
  loadingContainer.classList.add("show");
}

function showPuzzleWindow() {
  loadingContainer.classList.remove("show");
  mainContainer[0].classList.remove("hide");
  mainContainer[0].classList.add("show");
}

function hidePuzzleWindow() {
  mainContainer[0].classList.add("hide");
}

loadQuestionOption();
