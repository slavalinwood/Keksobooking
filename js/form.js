import {mapCanvas} from './advert.js'

const form = document.querySelector('.ad-form');
const housingSelect = form.querySelector('#type');
const priceInput = form.querySelector('#price');
const checkInSelect = form.querySelector('#timein');
const checkoutSelect = form.querySelector('#timeout');

const createNeededOffersArray = (data, offerClassName, offerText) => {
  const allOffers = data.querySelectorAll(`.${offerClassName}`);
  let neededOffers = [];
  allOffers.forEach((elem) => {
    if(elem.textContent === offerText) {
      neededOffers.push(elem)
    }
  })
  return neededOffers
};
