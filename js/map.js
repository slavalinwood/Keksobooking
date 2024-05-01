import {disableForm, enableForm} from './util.js';
import {form, formFieldsets} from './form.js';

const COORDINATES = {
  lat: 35.65283,
  lng: 139.83948,
  float: 5,
};

const address = document.querySelector('#address');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersSelects = mapFilters.children;

const onMapLoad = () => {
  enableForm(mapFiltersSelects);
  enableForm(formFieldsets);
  mapFilters.classList.remove('map__filters--disabled');
  form.classList.remove('ad-form--disabled');
}; 

const onMove = (evt) => {
  const coordinates = evt.target.getLatLng();
  const coordinatesArray = Object.values(coordinates);
  address.value = `${(coordinatesArray[0]).toFixed(COORDINATES.float)}, ${(coordinatesArray[1]).toFixed(COORDINATES.float)}`;
};

mapFilters.classList.add('map__filters--disabled');
disableForm(mapFiltersSelects);

const map = L.map('map-canvas').on('load', onMapLoad).setView({
  lat: COORDINATES.lat,
  lng: COORDINATES.lng,
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
    lat: COORDINATES.lat,
    lng: COORDINATES.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

if(address.parentElement.disabled) {
  address.value = '';
} else {
  address.value = `${COORDINATES.lat}, ${COORDINATES.lng}`;
}

mapLayer.addTo(map);
marker.addTo(map);
marker.on('move', onMove);
