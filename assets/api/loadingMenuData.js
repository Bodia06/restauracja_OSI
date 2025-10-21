export const loadingMenuData = () =>
  fetch('assets/data/menuData.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch(() => {
      console.log('Failed to load menuData.json');
      return [];
    });
