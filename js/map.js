import { disableForm } from './form.js';

const mapFilters = document.querySelector('.map__filters');
const mapFiltersSelects = mapFilters.children;

mapFilters.classList.add('map__filters--disabled');
disableForm(mapFiltersSelects);

const map = L.map('map-canvas').setView({
  lat:  35.652832,
  lng: 139.839478,
}, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);