import './form.js';
import './map.js';
import './api.js';
import { getData } from './api.js';
import { renderAdverts } from './advert.js';

const ADVERTS_COUNT = 10;

getData((advertsArray) => {
  renderAdverts(advertsArray.slice(0, ADVERTS_COUNT));
});