export function fetchBreeds() {
  const apiUrl = 'https://api.thecatapi.com/v1/breeds';

  return fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch cat breeds.');
      }
      return response.json();
    })
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
  const apiUrl = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&api_key=live_KOSlRsnZ1Bv6BJRA6bXEetoG5xvkYoNeTTQNNmhZyLCwvAB8FjNupiBSj7SvH844`;

  return fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch cat by breed.');
      }
      return response.json();
    })
    .then(([cat]) => {
      return cat;
    })
    .catch(error => {
      console.error('Error fetching cat data:', error);
      throw error;
    });
}
