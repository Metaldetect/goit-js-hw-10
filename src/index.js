import './css/styles.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import '/node_modules/slim-select/dist/slimselect.css';

const breedSelect = document.querySelector('.breed-select');
const catInfoContainer = document.querySelector('.cat-info');
const loaderElement = document.querySelector('.loader');

function populateBreedsSelect(breeds) {
  breeds.forEach(({ value, label }) => {
    breedSelect.insertAdjacentHTML(
      'beforeend',
      `<option value="${value}">${label}</option>`
    );
  });
  new SlimSelect({
    select: breedSelect,
  });
}

function displayCatInfo(cat) {
  const { name, origin, description, temperament, wikipedia_url } =
    cat.breeds[0];

  catInfoContainer.innerHTML = `
    <img src="${cat.url}" alt="Cat Image" width="1080" class="cat-image">
    <div class="cat-container-info">
      <h2 class="cat-name">Name: ${name}</h2>
      <h3 class="country">From: ${origin}</h3>
      <p class="cat-description">Description: ${description}</p>
      <p class="cat-temperament">Temperament: ${temperament}</p>
      <a href="${wikipedia_url}" class="wikipedia-link" target="_blank">Wikipedia</a>
    </div>
  `;

  loaderElement.classList.add('hidden');
  catInfoContainer.classList.remove('hidden');
}

function handleError(error) {
  loaderElement.classList.add('hidden');
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!'
  );
}

function handleBreedSelectChange() {
  const selectedBreedId = breedSelect.value;

  if (!selectedBreedId) {
    catInfoContainer.innerHTML = '';
    catInfoContainer.classList.add('hidden');
    return;
  }

  loaderElement.classList.remove('hidden');
  catInfoContainer.classList.add('hidden');

  fetchCatByBreed(selectedBreedId).then(displayCatInfo).catch(handleError);
}

fetchBreeds()
  .then(data => {
    populateBreedsSelect(data);
    loaderElement.classList.add('hidden');
  })
  .catch(handleError);

breedSelect.addEventListener('change', handleBreedSelectChange);
