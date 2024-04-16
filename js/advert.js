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

const checkData = (node, data) => {
  if (!data) {
    node.remove();
  }
};

const createNewFeaturesList = (list, data, map) => {
  if (!data) {
    return
  }
  const tempFeature = list.children[0];
  const newList = document.createDocumentFragment();
  data.forEach((elem) => {
    const feature = tempFeature.cloneNode(true);
    const classNames = feature.classList;
    let lastClass = classNames[classNames.length - 1];
    feature.classList.remove(lastClass);
    feature.classList.add(map.get(elem));
    newList.appendChild(feature);
  }) 
  list.innerHTML = '';
  list.appendChild(newList);
};

const HOUSING = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'hotel': 'Отель',
  'bungalow': 'Бунгало',
};

const createNewPhotosList = (list, data) => {
  if (!data) {
    return
  }
  const tempPhoto = list.children[0];
  data.forEach((elem) => {
    const photo = tempPhoto.cloneNode(true);
    tempPhoto.remove();
    photo.src = elem;
    list.appendChild(photo);
  })
};

adverts.forEach( ({author, offer}) => {
  const card = cardTemplate.cloneNode(true);
  const cardPhotos = card.querySelector('.popup__photos');
  const cardFeatures = card.querySelector('.popup__features');
  const cardAvatar = card.querySelector('.popup__avatar');
  const cardTitle = card.querySelector('.popup__title');
  const cardAddress = card.querySelector('.popup__text--address');
  const cardPrice = card.querySelector('.popup__text--price');
  const cardType = card.querySelector('.popup__type');
  const cardCapacity = card.querySelector('.popup__text--capacity');
  const cardTime = card.querySelector('.popup__text--time');
  const cardDescription = card.querySelector('.popup__description');
   
  checkData(cardAvatar, author.avatar);
  checkData(cardTitle, offer.title);
  checkData(cardAddress, offer.address);
  checkData(cardPrice, offer.price);
  checkData(cardType, offer.type);
  checkData(cardCapacity, offer.rooms);
  checkData(cardCapacity, offer.guests);
  checkData(cardTime, offer.checkin);
  checkData(cardTime, offer.checkout);
  checkData(cardDescription, offer.description);
  checkData(cardPhotos, offer.photos);
  checkData(cardFeatures, offer.features);
  
  cardAvatar.src = author.avatar;
  cardTitle.textContent = offer.title;
  cardAddress.textContent = offer.address;
  cardPrice.textContent = `${offer.price} ₽/ночь` 
  cardType.textContent = HOUSING[offer.type];
  cardCapacity.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  cardTime.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  cardDescription.textContent = offer.description;
  createNewFeaturesList(cardFeatures, offer.features, featuresMap);
  createNewPhotosList(cardPhotos, offer.photos);
  
  similarCardsList.appendChild(card);
});

mapCanvas.appendChild(similarCardsList);

export {mapCanvas}