import { createAdverts } from './data.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const mapCanvas = document.querySelector('#map-canvas');
const adverts = createAdverts();
const similarCardsList = document.createDocumentFragment();

const featuresMap = new Map();
featuresMap.set('wifi', 'popup__feature--wifi');
featuresMap.set('dishwasher', 'popup__feature--dishwasher');
featuresMap.set('parking', 'popup__feature--parking');
featuresMap.set('washer', 'popup__feature--washer');
featuresMap.set('elavator', 'popup__feature--elevator');
featuresMap.set('conditioner', 'popup__feature--conditioner');

const createNewFeaturesList = (list, data, map) => {
  const tempFeature = list.children[0];
  const newList = document.createDocumentFragment();
  for (let i = 0; i < data.length; i++) {
    const feature = tempFeature.cloneNode(true);
    const classNames = feature.classList;
    let lastClass = classNames[classNames.length - 1];
    feature.classList.remove(lastClass);
    feature.classList.add(map.get(data[i]));
    newList.appendChild(feature);
  }
  list.innerHTML = '';
  list.appendChild(newList);
};

const translateHousingType = (type) => {
  switch (type) {
    case 'palace':
      return 'Дворец';
    case 'flat':
      return 'Квартира';
    case 'house':
      return 'Дом';
    case 'hotel':
      return 'Отель';
    case 'bungalow':
      return 'Бунгало';
  }
};

const createNewPhotosList = (list, data) => {
  const tempPhoto = list.children[0];
  for (let i = 0; i < data.length; i++) {
    const photo = tempPhoto.cloneNode(true);
    tempPhoto.remove();
    photo.src = data[i];
    list.appendChild(photo);
  }
};

adverts.forEach( ({author, offer, location}) => {
  const card = cardTemplate.cloneNode(true);
  const cardPhotos = card.querySelector('.popup__photos');
  const cardFeatures = card.querySelector('.popup__features');
  card.querySelector('.popup__avatar').src = author.avatar;
  card.querySelector('.popup__title').textContent = offer.title;
  card.querySelector('.popup__text--address').textContent = offer.address;
  card.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь` 
  card.querySelector('.popup__type').textContent = translateHousingType(offer.type);
  card.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  card.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  createNewFeaturesList(cardFeatures, offer.features, featuresMap);
  card.querySelector('.popup__description').textContent = offer.description;
  createNewPhotosList(cardPhotos, offer.photos);
  similarCardsList.appendChild(card);
});

mapCanvas.appendChild(similarCardsList.children[0])