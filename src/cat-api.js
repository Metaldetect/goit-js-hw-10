export function fetchBreeds() {
  return fetch('https://api.thecatapi.com/v1/breeds')
    .then(response => response.json())
    .then(data => {
      return data.map(({ id, name }) => ({
        value: id,
        label: name,
      }));
    })
    .catch(error => {
      console.error('Error fetching cat breeds:', error);
      return [];
    });
}

export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&api_key=live_KOSlRsnZ1Bv6BJRA6bXEetoG5xvkYoNeTTQNNmhZyLCwvAB8FjNupiBSj7SvH844`;

  return fetch(url)
    .then(response => response.json())
    .then(([cat]) => {
      return cat;
    })
    .catch(error => {
      console.error('Error fetching cat data:', error);
      throw error;
    });
}
