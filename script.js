const resultElement = document.querySelector("#result");
const pokemonImage = document.querySelector("#pokemon-image");
const optionsContainer = document.querySelector("#options");
const pointsElement = document.querySelector("#points-value");
const totalCount = document.querySelector("#total-count");
const mainContainer = document.querySelector(".container");
const loadingContainer = document.querySelector("#loading-container");

let usedPokemonId = [];

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
}
