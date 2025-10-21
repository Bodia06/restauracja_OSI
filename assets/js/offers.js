const offersLists = document.querySelector('.offers__lists');

export const offersActive = offersData => {
  const today = new Date().getDay();

  return offersData.map(offer => {
    if (offer.name === 'Druga pizza za połowę ceny') {
      offer.active = today === 4;
    } else {
      offer.active = true;
    }
    return offer;
  });
};

export const renderOffers = offersDataArray => {
  offersLists.innerHTML = '';

  offersDataArray.forEach(offerData => {
    const { id, name, description, active } = offerData;

    const offerItem = document.createElement('li');
    offerItem.classList.add('offers__lists-item', `offers__lists-item-${id}`);

    const offerTitle = document.createElement('h3');
    offerTitle.classList.add('offers__lists-item__title');
    offerTitle.textContent = name;

    const offerDescription = document.createElement('p');
    offerDescription.classList.add('offers__lists-item__description');
    offerDescription.textContent = description;

    const offerStatus = document.createElement('span');
    offerStatus.classList.add('offers__lists-item__status');
    offerStatus.textContent = active ? 'Teraz!' : 'Brak!';
    offerStatus.classList.add(active ? 'active' : 'inactive');

    offerItem.appendChild(offerTitle);
    offerItem.appendChild(offerDescription);
    offerItem.appendChild(offerStatus);

    offersLists.appendChild(offerItem);
  });
};
