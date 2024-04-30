import {disableForm, enableForm} from './util.js';
import {form, formFieldsets} from './form.js';

const mapFilters = document.querySelector('.map__filters');
const mapFiltersSelects = mapFilters.children;

mapFilters.classList.add('map__filters--disabled');
disableForm(mapFiltersSelects);

const onMapLoad = () => {
  enableForm(mapFiltersSelects);
  enableForm(formFieldsets);
  mapFilters.classList.remove('map__filters--disabled');
  form.classList.remove('ad-form--disabled');
}; 

const map = L.map('map-canvas').on('load', onMapLoad).setView({
  lat: 35.652832,
  lng: 139.839478,
}, 10);

const mapLayer = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
);

const mainPinIcon = L.icon({
  iconUrl: 'keksobooking-leaflet/leaflet/img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const marker = L.marker(
  {
    lat: 35.652832,
    lng: 139.839478,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mapLayer.addTo(map);
marker.addTo(map);