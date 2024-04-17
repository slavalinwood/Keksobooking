import {mapCanvas, CARD_CLASSES} from './advert.js';

const PRICE_STRING_LETTER_COUNTER = 7;

const form = document.querySelector('.ad-form');
const housingSelect = form.querySelector('#type');
const priceInput = form.querySelector('#price');
const checkInSelect = form.querySelector('#timein');
const checkoutSelect = form.querySelector('#timeout');

const findOfferStartingPrice = (cardsList, offerClassName, offerName, priceClassName) => {
  const allOffers = cardsList.querySelectorAll(`.${offerClassName}`);
  const pricesArray = [];
  allOffers.forEach((elem) => {
    if(elem.textContent === offerName) {
      const neededCard = elem.parentElement;
      const currentPriceString = neededCard.querySelector(`.${priceClassName}`).textContent;
      const currentPrice = Number(currentPriceString.split(' ')[0]);
      pricesArray.push(currentPrice);
    }
  })
  let minPrice = pricesArray[0];
  console.log(pricesArray)
  pricesArray.forEach((elem) => {
    if (minPrice > elem) {
      minPrice = elem;
    }
  })
  return minPrice;
};
