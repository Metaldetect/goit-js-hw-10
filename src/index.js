import './css/styles.css';
import SlimSelect from 'slim-select';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

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
}

function displayCatInfo(cat) {
  const { name, origin, description, temperament, wikipedia_url } =
    cat.breeds[0];

  catInfoContainer.innerHTML = `
  <img src="${cat.url}" alt="Cat Image" width='1080' class="cat-image">
  <div class="cat-container-info">
    <h2 class="cat-name">Name: ${name}</h2>
    <h2 class="country">From: ${origin}</h2>
    <p class="cat-description">Description: ${description}</p>
    <p class="cat-temperament">Temperament: ${temperament}</p>
    <a href="${wikipedia_url}" class="wikipedia-link" target="_blank">Wikipedia</a>
  </div>
`;

  const catImage = catInfoContainer.querySelector('.cat-image');

  catImage.addEventListener('load', () => {
    loaderElement.classList.add('hidden');
    catInfoContainer.classList.remove('hidden');
  });

  catImage.addEventListener('error', () => {
    loaderElement.classList.add('hidden');
    handleError('Failed to load image');
  });
}

function handleError(error) {
  loaderElement.classList.add('hidden');
  console.error('Oops! Something went wrong:', error);
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

fetchBreeds().then(populateBreedsSelect).catch(handleError);

breedSelect.addEventListener('change', handleBreedSelectChange);
