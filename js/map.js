import { disableForm, enableForm, showAlert} from './util.js';
import { form, address, validateGuestsRoomsSelects, formSubmitButton } from './form.js';
import {similarCardsList } from './advert.js';
import { getData } from './api.js';
import { renderAdverts } from './advert.js';

const ADVERTS_COUNT = 10;
const MAP_ZOOM = 10;
const COORDINATES_FLOAT = 5;

const DefaultCoordinates = {
  lat: 35.65283,
  lng: 139.83948,
};

const mapFilters = document.querySelector('.map__filters');

mapFilters.classList.add('map__filters--disabled');
disableForm(mapFilters);

const renderAdvertsMarkers = (advertsArray) => {
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
} 

// Загрузка карты переводит страницу в активное состояние 
const onMapLoad = () => {
  enableForm(mapFilters);
  enableForm(form);
  formSubmitButton.addEventListener('click', validateGuestsRoomsSelects);
  mapFilters.classList.remove('map__filters--disabled');
  form.classList.remove('ad-form--disabled');
  address.defaultValue = `${DefaultCoordinates.lat}, ${DefaultCoordinates.lng}`
  getData((advertsArray) => {
    renderAdvertsMarkers(advertsArray);
  }, () => {
    showAlert('Не удалось загрузить объявления');
  });
}; 

const onMove = (evt) => {
  const coordinates = evt.target.getLatLng();
  const coordinatesArray = Object.values(coordinates);
  const latCoordinate = coordinatesArray[0];
  const lngCoordinate = coordinatesArray[1];
  address.value = `${(latCoordinate).toFixed(COORDINATES_FLOAT)}, ${(lngCoordinate).toFixed(COORDINATES_FLOAT)}`;
};

const map = L.map('map-canvas').on('load', onMapLoad).setView({
  lat: DefaultCoordinates.lat,
  lng: DefaultCoordinates.lng,
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
    lat: DefaultCoordinates.lat,
    lng: DefaultCoordinates.lng,
  },
  {
    draggable: true,
    icon: mainMarkerIcon,
  },
);

mapLayer.addTo(map);
mainMarker.addTo(map);
mainMarker.on('move', onMove);

export { mainMarker, DefaultCoordinates, mapFilters };