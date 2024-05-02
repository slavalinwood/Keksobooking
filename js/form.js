import {disableForm} from './util.js';

const MAX_PRICE = 1000000;
const HOUSING_STARTING_PRICE = {
  'bungalow': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000,
};

const form = document.querySelector('.ad-form');
const formFieldsets = form.children;
const housingSelect = form.querySelector('#type');
const selectedHousing = housingSelect.querySelector('[selected]');
const priceInput = form.querySelector('#price');
const timeFieldset = form.querySelector('.ad-form__element--time');
const checkInSelect = timeFieldset.querySelector('#timein');
const checkoutSelect = timeFieldset.querySelector('#timeout');

const onHousingSelectChange = (evt) => {
  priceInput.value = '';
  priceInput.placeholder = HOUSING_STARTING_PRICE[evt.target.value];
  priceInput.min = HOUSING_STARTING_PRICE[evt.target.value];
};

const onTimeFieldsetChange = (evt) => {
  checkoutSelect.value = evt.target.value;
  checkInSelect.value = evt.target.value;
};

form.classList.add('ad-form--disabled');
disableForm(formFieldsets);
priceInput.min = HOUSING_STARTING_PRICE[selectedHousing.value];
priceInput.max = MAX_PRICE;
priceInput.placeholder = HOUSING_STARTING_PRICE[selectedHousing.value];

housingSelect.addEventListener('change', onHousingSelectChange);
timeFieldset.addEventListener('change', onTimeFieldsetChange);

export {form, formFieldsets};