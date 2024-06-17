/* global L:readonly */


import { disableForm, enableForm, showAlert} from './util.js';
import { address, validateGuestsRoomsSelects, formSubmitButton, enableAdvertForm } from './form.js';
import { similarCardsList } from './advert.js';
import { getData } from './api.js';
import { renderAdverts } from './advert.js';

const ADVERTS_COUNT = 10;
const MAP_ZOOM = 12;
const COORDINATES_FLOAT = 5;

const FilterPrices = {
  low: 10000,
  high: 50000,
};

const DefaultCoordinates = {
  lat: 35.65283,
  lng: 139.83948,
};

const mapFilters = document.querySelector('.map__filters');
const housingFilter = mapFilters.querySelector('#housing-type');
const priceFilter = mapFilters.querySelector('#housing-price');
const roomsFilter = mapFilters.querySelector('#housing-rooms');
const guestsFilter = mapFilters.querySelector('#housing-guests');
const advertPopup = document.querySelector('.leaflet-popup');

const disableMapFilters = () => {
  mapFilters.classList.add('map__filters--disabled');
  disableForm(mapFilters);
};

const enableMapFilters = () => {
  mapFilters.classList.remove('map__filters--disabled');
  enableForm(mapFilters);
};

const renderAdvertsMarkers = (advertsArray) => {
  renderAdverts(advertsArray);
  advertsArray.forEach((advert, index) => {
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
}; 

// Загрузка карты переводит страницу в активное состояние 
const onMapLoad = () => {
  enableAdvertForm();
  formSubmitButton.addEventListener('click', validateGuestsRoomsSelects);
  address.defaultValue = `${DefaultCoordinates.lat}, ${DefaultCoordinates.lng}`;
  getData((advertsArray) => {
    renderAdvertsMarkers(advertsArray.slice(0, ADVERTS_COUNT));
    enableMapFilters();
    mapFilters.addEventListener('change', onMapFilterChange(advertsArray));
  }, () => {
    showAlert('Не удалось загрузить объявления');
    disableMapFilters();
  });
}; 

const onMove = (evt) => {
  const coordinates = evt.target.getLatLng();
  const coordinatesArray = Object.values(coordinates);
  const latCoordinate = coordinatesArray[0];
  const lngCoordinate = coordinatesArray[1];
  address.value = `${(latCoordinate).toFixed(COORDINATES_FLOAT)}, ${(lngCoordinate).toFixed(COORDINATES_FLOAT)}`;
};

disableMapFilters();

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

const onMapFilterChange = (advertsArray) => {
  return () => {
    map.closePopup(advertPopup);
    const filteredArray = advertsArray.reduce((acc, advert) => {
      if (housingFilter.value === advert.offer.type || housingFilter.value === 'any') {
        const middlePriceFilterCheck = (priceFilter.value === 'middle' && (advert.offer.price <= FilterPrices.high && advert.offer.price >= FilterPrices.low));
        const highPriceFilterCheck = (priceFilter.value === 'high' && advert.offer.price >= FilterPrices.high);
        const lowPriceFilterCheck = (priceFilter.value === 'low' && advert.offer.price <= FilterPrices.low);
        if (middlePriceFilterCheck || highPriceFilterCheck || lowPriceFilterCheck || priceFilter.value === 'any') {
          if (roomsFilter.value == advert.offer.rooms || roomsFilter.value === 'any') {
            if (guestsFilter.value == advert.offer.guests || guestsFilter.value === 'any') {
              acc.push(advert)
            }
          }
        }
      }
      return acc;
    }, []);
    console.log(filteredArray);
  };
}

mapLayer.addTo(map);
mainMarker.addTo(map);
mainMarker.on('move', onMove);
mapFilters.addEventListener('change', onMapFilterChange);

export { mainMarker, DefaultCoordinates, mapFilters };