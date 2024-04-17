import { createAdverts } from './data.js';

const HOUSING = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'hotel': 'Отель',
  'bungalow': 'Бунгало',
};

const FEATURES_MAP = {
  'wifi': 'popup__feature--wifi',
  'dishwasher': 'popup__feature--dishwasher',
  'parking': 'popup__feature--parking',
  'washer': 'popup__feature--washer',
  'elavator': 'popup__feature--elevator',
  'conditioner': 'popup__feature--conditioner',
};

const CARD_CLASSES = {
  photos: 'popup__photos',
  features: 'popup__features',
  avatar: 'popup__avatar',
  title: 'popup__title',
  address: 'popup__text--address',
  price: 'popup__text--price',
  type: 'popup__type',
  capacity: 'popup__text--capacity',
  time: 'popup__text--time',
  description: 'popup__description',
}

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const mapCanvas = document.querySelector('#map-canvas');
const adverts = createAdverts();
const similarCardsList = document.createDocumentFragment();

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
    feature.classList.add(map[elem]);
    newList.appendChild(feature);
  }) 
  list.innerHTML = '';
  list.appendChild(newList);
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
  const cardPhotos = card.querySelector(`.${CARD_CLASSES.photos}`);
  const cardFeatures = card.querySelector(`.${CARD_CLASSES.features}`);
  const cardAvatar = card.querySelector(`.${CARD_CLASSES.avatar}`);
  const cardTitle = card.querySelector(`.${CARD_CLASSES.title}`);
  const cardAddress = card.querySelector(`.${CARD_CLASSES.address}`);
  const cardPrice = card.querySelector(`.${CARD_CLASSES.price}`);
  const cardType = card.querySelector(`.${CARD_CLASSES.type}`);
  const cardCapacity = card.querySelector(`.${CARD_CLASSES.capacity}`);
  const cardTime = card.querySelector(`.${CARD_CLASSES.time}`);
  const cardDescription = card.querySelector(`.${CARD_CLASSES.description}`);

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
  cardPrice.innerHTML = `${offer.price} <span>₽/ночь</span>`;
  cardType.textContent = HOUSING[offer.type];
  cardCapacity.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  cardTime.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  cardDescription.textContent = offer.description;
  createNewFeaturesList(cardFeatures, offer.features, FEATURES_MAP);
  createNewPhotosList(cardPhotos, offer.photos);

  similarCardsList.appendChild(card);
});

mapCanvas.appendChild(similarCardsList);

export {mapCanvas, CARD_CLASSES}