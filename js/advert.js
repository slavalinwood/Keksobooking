//import { createAdverts } from './data.js';
import { createNewFeaturesList, createNewPhotosList } from './util.js';

const housing = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'hotel': 'Отель',
  'bungalow': 'Бунгало',
};

const featuresMap = {
  'wifi': 'popup__feature--wifi',
  'dishwasher': 'popup__feature--dishwasher',
  'parking': 'popup__feature--parking',
  'washer': 'popup__feature--washer',
  'elevator': 'popup__feature--elevator',
  'conditioner': 'popup__feature--conditioner',
};

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
//const adverts = createAdverts();
const similarCardsList = document.createDocumentFragment();

const checkData = (node, data) => {
  if (!data) {
    node.remove();
  }
};

const renderAdverts = (similarAdverts) => {
  similarCardsList.innerHTML = '';
  similarCardsList.textContent = '';

  similarAdverts.forEach( ({author, offer}) => {
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
    const cardChildren = card.children;
  
    checkData(cardAvatar, author.avatar);
    checkData(cardPhotos, offer.photos);
    checkData(cardFeatures, offer.features);
  
    cardAvatar.src = author.avatar;
    cardTitle.textContent = offer.title;
    cardAddress.textContent = offer.address;
    cardPrice.textContent = `${offer.price} ₽/ночь`;
    cardType.textContent = housing[offer.type];
    cardCapacity.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
    cardTime.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
    cardDescription.textContent = offer.description;
    createNewFeaturesList(cardFeatures, offer.features, featuresMap);
    createNewPhotosList(cardPhotos, offer.photos);
  
    for (let elem of cardChildren) {
      if (elem.textContent.includes('undefined')) {
        elem.remove();
      }
    }
  
    similarCardsList.appendChild(card);
  });
};

export {similarCardsList, renderAdverts};