const resultElement = document.querySelector("#result");
const pokemonImage = document.querySelector("#pokemon-image");
const optionsContainer = document.querySelector("#options");
const pointsElement = document.querySelector("#points-value");
const totalCount = document.querySelector("#total-count");
const mainContainer = document.querySelector(".container");
const loadingContainer = document.querySelector("#loading-container");

let usedPokemonId = [];
let count = 0;

async function fetchPokemonById(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await response.json();
  return data;
}

function getRandomId() {
  return Math.floor(Math.random() * 151) + 1;
}

async function loadQuestionOption() {
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
}

loadQuestionOption();
