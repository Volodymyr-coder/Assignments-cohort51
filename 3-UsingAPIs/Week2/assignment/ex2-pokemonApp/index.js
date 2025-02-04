/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Assignments/blob/main/3-UsingAPIs/Week2/README.md#exercise-2-gotta-catch-em-all

Complete the four functions provided in the starter `index.js` file:

`fetchData`: In the `fetchData` function, make use of `fetch` and its Promise 
  syntax in order to get the data from the public API. Errors (HTTP or network 
  errors) should be logged to the console.

`fetchAndPopulatePokemons`: Use `fetchData()` to load the pokemon data from the 
  public API and populate the `<select>` element in the DOM.
  
`fetchImage`: Use `fetchData()` to fetch the selected image and update the 
  `<img>` element in the DOM.

`main`: The `main` function orchestrates the other functions. The `main` 
  function should be executed when the window has finished loading.

Use async/await and try/catch to handle promises.

Try and avoid using global variables. As much as possible, try and use function 
parameters and return values to pass data back and forth.
------------------------------------------------------------------------------*/
const container = document.createElement('div');
const btn = document.createElement('button');
const selectElem = document.createElement('select');
const img = document.createElement('img');

btn.textContent = 'Get Pokemon!';
btn.id = 'GetPokemon';
btn.classList.add('btn');

selectElem.classList.add('select');

img.classList.add('img');

container.classList.add('container');
container.appendChild(btn);
container.appendChild(selectElem);
container.appendChild(img);
document.body.appendChild(container);

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon?limit=151';

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

async function fetchAndPopulatePokemons() {
  try {
    const data = await fetchData(BASE_URL);
    data.results.forEach((pokemon) => {
      const option = document.createElement('option');
      option.value = pokemon.url;
      option.textContent = pokemon.name;
      selectElem.appendChild(option);
    });
  } catch (error) {
    console.error('Failed to fetch and populate Pokemons:', error);
  }
}

async function fetchImage(url) {
  try {
    const data = await fetchData(url);
    img.src = data.sprites.front_default;
    img.alt = data.name;
  } catch (error) {
    console.error('Failed to fetch image:', error);
  }
}

async function main() {
  btn.addEventListener('click', async () => {
    await fetchAndPopulatePokemons();
  });

  selectElem.addEventListener('change', async (event) => {
    const selectedUrl = event.target.value;
    if (selectedUrl) {
      await fetchImage(selectedUrl);
    }
  });
}

window.addEventListener('load', main);
