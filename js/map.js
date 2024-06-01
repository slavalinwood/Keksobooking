import {disableForm, enableForm, showAlert} from './util.js';
import {form, formFieldsets, address} from './form.js';
import {similarCardsList } from './advert.js';
import { getData } from './api.js';
import { renderAdverts } from './advert.js';

const ADVERTS_COUNT = 10;

const MAP_ZOOM = 10;

const COORDINATES = {
  lat: 35.65283,
  lng: 139.83948,
  float: 5,
};

const mapFilters = document.querySelector('.map__filters');
const mapFiltersSelects = mapFilters.children;

mapFilters.classList.add('map__filters--disabled');
disableForm(mapFiltersSelects);

const onMapLoad = () => {
  enableForm(mapFiltersSelects);
  enableForm(formFieldsets);
  mapFilters.classList.remove('map__filters--disabled');
  form.classList.remove('ad-form--disabled');
  getData((advertsArray) => {
    const neededAdverts = advertsArray.slice(0, ADVERTS_COUNT);
    renderAdverts(neededAdverts);
    neededAdverts.forEach((advert, index) => {
      const currentAdress = advert.location;
      const addressLat = currentAdress.lat;
      const addressLng = currentAdress.lng;
      const regularMarker = L.marker(
        {
          lat: addressLat,
          lng: addressLng,
        },
        {
          draggable: true,
          icon: regularPinIcon,
        },
      );
      regularMarker.addTo(map).bindPopup(similarCardsList.children[index]);
    })    
  }, () => {
    showAlert('Не удалось загрузить объявления')
  });
}; 

const onMove = (evt) => {
  const coordinates = evt.target.getLatLng();
  const coordinatesArray = Object.values(coordinates);
  address.value = `${(coordinatesArray[0]).toFixed(COORDINATES.float)}, ${(coordinatesArray[1]).toFixed(COORDINATES.float)}`;
};

const map = L.map('map-canvas').on('load', onMapLoad).setView({
  lat: COORDINATES.lat,
  lng: COORDINATES.lng,
}, MAP_ZOOM);

const mapLayer = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
);

const mainMarkerIcon = L.icon({
  iconUrl: 'keksobooking-leaflet/leaflet/img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const regularPinIcon = L.icon({
  iconUrl: 'keksobooking-leaflet/leaflet/img/pin.svg',
  inconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainMarker = L.marker(
  {
    lat: COORDINATES.lat,
    lng: COORDINATES.lng,
  },
  {
    draggable: true,
    icon: mainMarkerIcon,
  },
);

if(address.parentElement.disabled) {
  address.value = '';
} else {
  address.defaultValue = `${COORDINATES.lat}, ${COORDINATES.lng}`;
}

mapLayer.addTo(map);
mainMarker.addTo(map);
mainMarker.on('move', onMove);

export {mapFilters, mapFiltersSelects}