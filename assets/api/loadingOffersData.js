export const loadingOffersData = () =>
  fetch('assets/data/offersData.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch(() => {
      console.log('Failed to load offersData.json');
      return [];
    });
