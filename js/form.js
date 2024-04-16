import {mapCanvas} from './advert.js'

const form = document.querySelector('.ad-form');
const housingSelect = form.querySelector('#type');
const priceInput = form.querySelector('#price');
const checkInSelect = form.querySelector('#timein');
const checkoutSelect = form.querySelector('#timeout');

const findOfferStartingPrice = (data, offerClassName, offerText, priceClassName) => {
  const allOffers = data.querySelectorAll(`.${offerClassName}`);
  const pricesArray = [];
  allOffers.forEach((elem) => {
    if(elem.textContent === offerText) {
      const neededFragment = elem.parentElement;
      const currentPrice = neededFragment.querySelector(`.${priceClassName}`).textContent;
      pricesArray.push(currentPrice);
    }
  })
  let minPrice = pricesArray[0];
  pricesArray.forEach((elem) => {
    if (minPrice > elem) {
      minPrice = elem;
    }
  })
  return minPrice
};

findOfferStartingPrice(mapCanvas, 'popup__type', 'Квартира', 'popup__text--price')