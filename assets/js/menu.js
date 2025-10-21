import CONSTANTS from '../utils/constants.js';

const menuLists = document.querySelector('.menu-lists');
const shoppingCartButton = document.querySelector('.shopping-cart__count');
const shoppingCartBtn = document.querySelector('.shopping-cart__btn');
const shoppingCartList = document.querySelector('.shopping-cart__section');

//Zmiena dla liczby zamówionych pozycji w koszyku
let cartItemCount = 0;

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

if (shoppingCartButton) {
  const updateCartColor = () => {
    shoppingCartButton.textContent = cartItemCount;
    if (cartItemCount > 0) {
      shoppingCartButton.style.color = 'green';
    } else {
      shoppingCartButton.style.color = 'red';
    }
  };
  updateCartColor();
} else {
  console.error('Shopping cart button not found');
}

shoppingCartBtn.addEventListener('click', () => {
  shoppingCartBtn.classList.toggle('active');
  shoppingCartList.classList.toggle('active');
});

export const renderMenuItems = menuData => {
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
    menuItemButton.addEventListener('click', () => {
      cartItemCount += 1;
      CONSTANTS.SHOPPING_CART_ITEMS.push({
        id,
        name,
        size: sizeSelect.value,
        price: Number(calcPriceToSell(price, sizeSelect.value)),
      });
      renderShoppingCartItems();
      if (shoppingCartButton) {
        shoppingCartButton.textContent = cartItemCount;
        shoppingCartButton.style.color = cartItemCount > 0 ? 'green' : 'red';
      }
    });

    menuItem.appendChild(menuImg);
    menuItem.appendChild(menuItemName);
    menuItem.appendChild(sizeLabel);
    menuItem.appendChild(menuItemDescription);
    menuItem.appendChild(menuItemButton);

    menuLists.appendChild(menuItem);
  });
};

export const renderShoppingCartItems = () => {
  const cartList = document.querySelector('.shopping-cart__lists');
  const totalAmountEl = document.querySelector('.shopping-cart__total-amount');

  cartList.innerHTML = '';

  let totalPrice = 0;
  CONSTANTS.SHOPPING_CART_ITEMS.forEach((item, index) => {
    const { name, size, price } = item;
    totalPrice += price;

    const cartItem = document.createElement('li');
    cartItem.classList.add('shopping-cart__item');

    const itemName = document.createElement('span');
    itemName.textContent = name;
    itemName.classList.add('shopping-cart__item-name');

    const itemSize = document.createElement('span');
    itemSize.textContent = `Size: ${size}`;
    itemSize.classList.add('shopping-cart__item-size');

    const itemPrice = document.createElement('span');
    itemPrice.textContent = `${price} PLN`;
    itemPrice.classList.add('shopping-cart__item-price');

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '×';
    deleteBtn.classList.add('shopping-cart__item-delete');
    deleteBtn.addEventListener('click', () => {
      CONSTANTS.SHOPPING_CART_ITEMS.splice(index, 1);
      cartItemCount -= 1;
      if (shoppingCartButton) {
        shoppingCartButton.textContent = cartItemCount;
        shoppingCartButton.style.color = cartItemCount > 0 ? 'green' : 'red';
      }
      renderShoppingCartItems();
    });

    cartItem.appendChild(itemName);
    cartItem.appendChild(itemSize);
    cartItem.appendChild(itemPrice);
    cartItem.appendChild(deleteBtn);

    cartList.appendChild(cartItem);
  });

  totalAmountEl.textContent = `${totalPrice} PLN`;
};
