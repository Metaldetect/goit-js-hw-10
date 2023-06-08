export function fetchBreeds() {
  return fetch('https://api.thecatapi.com/v1/breeds')
    .then(response => response.json())
    .then(data => {
      return data.map(breed => ({
        value: breed.id,
        label: breed.name,
      }));
    })
    .catch(error => {
      console.error('Помилка при отриманні порід котів:', error);
      return [];
    });
}

export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&api_key=live_KOSlRsnZ1Bv6BJRA6bXEetoG5xvkYoNeTTQNNmhZyLCwvAB8FjNupiBSj7SvH844`;

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      const cat = data[0];
      return cat;
    })
    .catch(error => {
      console.error('Сталася помилка при отриманні даних про кота:', error);
      throw error;
    });
}
