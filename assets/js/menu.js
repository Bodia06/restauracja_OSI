const loadingMenuData = () =>
  fetch('../../data/menuData.json')
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

function calcPriceToSell (price, size) {
  switch (size) {
    case 'S':
      return price;
    case 'M':
      return (price * 1.25).toFixed(0);
    case 'L':
      return (price * Math.pow(1.25, 2)).toFixed(0);
    case 'XL':
      return (price * Math.pow(1.25, 3)).toFixed(0);
    default:
      return price;
  }
}
const menuLists = document.querySelector('.menu-lists');

const renderMenuItems = menuData => {
  menuData.forEach(item => {
    const { id, name, size, description, ImgSrc, price } = item;

    const menuItem = document.createElement('li');
    menuItem.classList.add('menu__lists-item', `menu__item--${id}`);

    const menuImg = document.createElement('img');
    menuImg.src = ImgSrc;
    menuImg.alt = `Image of ${name}`;
    menuImg.classList.add('menu__lists-item__img');

    const menuItemName = document.createElement('h3');
    menuItemName.textContent = name;
    menuItemName.classList.add('menu__lists-item__name');

    const sizeLabel = document.createElement('label');
    sizeLabel.textContent = 'Size: ';
    sizeLabel.classList.add('menu__lists-item__size-label');

    const sizeSelect = document.createElement('select');
    sizeSelect.name = `size-${id}`;
    sizeSelect.classList.add('menu__lists-item__size');

    size.forEach(s => {
      const option = document.createElement('option');
      option.value = s;
      option.textContent = s;
      sizeSelect.appendChild(option);
    });

    sizeLabel.appendChild(sizeSelect);

    const menuItemDescription = document.createElement('p');
    menuItemDescription.textContent = `Składniki: ${description}`;
    menuItemDescription.classList.add('menu__lists-item__description');

    const menuItemButton = document.createElement('button');
    menuItemButton.classList.add('menu__lists-item__button');
    const updatePrice = () => {
      menuItemButton.textContent = `Add to Order ${calcPriceToSell(
        price,
        sizeSelect.value
      )} PLN`;
    };
    updatePrice();
    sizeSelect.addEventListener('change', updatePrice);

    menuItem.appendChild(menuImg);
    menuItem.appendChild(menuItemName);
    menuItem.appendChild(sizeLabel);
    menuItem.appendChild(menuItemDescription);
    menuItem.appendChild(menuItemButton);

    menuLists.appendChild(menuItem);
  });
};

loadingMenuData().then(renderMenuItems);
