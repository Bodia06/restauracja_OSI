import { renderMenuItems, renderShoppingCartItems } from './menu.js';
import { offersActive, renderOffers } from './offers.js';
import { loadingMenuData, loadingOffersData } from '../api/index.js';

loadingMenuData().then(renderMenuItems);
loadingOffersData().then(offersActive).then(renderOffers);
renderShoppingCartItems;
