import './css/styles.css';
// import Notiflix from 'notiflix';
// import debounce from 'lodash.debounce';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const breedSelect = document.querySelector('.breed-select');
const catContainer = document.querySelector('.cat-info');

const API_KEY =
  'live_KOSlRsnZ1Bv6BJRA6bXEetoG5xvkYoNeTTQNNmhZyLCwvAB8FjNupiBSj7SvH844';

fetchBreeds(API_KEY)
  .then(breeds => {
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.value;
      option.textContent = breed.label;
      breedSelect.appendChild(option);
    });
  })
  .catch(error => {
    console.error('Сталася помилка:', error);
  });

breedSelect.addEventListener('change', () => {
  const selectedBreedId = breedSelect.value;

  fetchCatByBreed(selectedBreedId)
    .then(cat => {
      catContainer.innerHTML = '';

      const catImageElement = document.createElement('img');
      catImageElement.src = cat.url;
      catImageElement.alt = 'Cat Image';
      catImageElement.width = 480;
      catContainer.appendChild(catImageElement);

      const breedNameElement = document.createElement('h2');
      breedNameElement.textContent = cat.breeds[0].name;
      catContainer.appendChild(breedNameElement);

      const breedDescriptionElement = document.createElement('p');
      breedDescriptionElement.textContent = `Description: ${cat.breeds[0].description}`;
      catContainer.appendChild(breedDescriptionElement);

      const breedTemperamentElement = document.createElement('p');
      breedTemperamentElement.textContent = `Temperament: ${cat.breeds[0].temperament}`;
      catContainer.appendChild(breedTemperamentElement);

      const breedWikipediaElement = document.createElement('a');
      breedWikipediaElement.href = cat.breeds[0].wikipedia_url;
      breedWikipediaElement.textContent = 'Wikipedia';
      catContainer.appendChild(breedWikipediaElement);
    })
    .catch(error => {
      console.error('Сталася помилка при отриманні даних про кота:', error);
    });
});
