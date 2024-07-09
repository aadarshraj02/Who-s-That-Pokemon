const resultElement = document.querySelector("#result");
const pokemonImage = document.querySelector("#pokemon-image");
const optionsContainer = document.querySelector("#options");
const pointsElement = document.querySelector("#points-value");
const totalCount = document.querySelector("#total-count");
const mainContainer = document.querySelector(".container");
const loadingContainer = document.querySelector("#loading-container");

async function fetchPokemonById() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/1");
  const data = await response.json();
  return data;
}
