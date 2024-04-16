import {mapCanvas} from './advert.js'

const form = document.querySelector('.ad-form');
const housingSelect = form.querySelector('#type');
const housingSelectOptions = housingSelect.children;
const priceInput = form.querySelector('#price');
const checkInSelect = form.querySelector('#timein');
const checkoutSelect = form.querySelector('#timeout');

const findOfferStartingPrice = (parentNode, offerClassName, offerTitle, priceClassName) => {
  const allOffers = parentNode.querySelectorAll(`.${offerClassName}`);
  const pricesArray = [];
  let minPrice = pricesArray[0];
  allOffers.forEach((elem) => {
    if(elem.textContent === offerTitle) {
      const neededFragment = elem.parentElement;
      const currentPrice = neededFragment.querySelector(`.${priceClassName}`).textContent;
      pricesArray.push(currentPrice);
    }
  })
  pricesArray.forEach((elem) => {
    if (minPrice > elem) {
      minPrice = elem;
    }
  })
  return minPrice;
};

