import {disableForm} from './util.js';

const MAX_ROOMS = '100';

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
const roomsSelect = form.querySelector('#room_number');
const guestsSelect = form.querySelector('#capacity');

const onHousingSelectChange = (evt) => {
  priceInput.value = '';
  priceInput.placeholder = HOUSING_STARTING_PRICE[evt.target.value];
  priceInput.min = HOUSING_STARTING_PRICE[evt.target.value];
};

const onTimeFieldsetChange = (evt) => {
  checkoutSelect.value = evt.target.value;
  checkInSelect.value = evt.target.value;
};

const onRoomsSelectChange = (evt) => {
  const guestsOptions = guestsSelect.children;
  for (let i = 0; i < guestsOptions.length; i++) {
    const currentGuestsOption = guestsOptions[i];
    if (currentGuestsOption.value > evt.target.value || currentGuestsOption.value === '0') {
      currentGuestsOption.disabled = true;
    }else {
      currentGuestsOption.disabled = false;
      guestsSelect.value = currentGuestsOption.value;
    }
    if (evt.target.value === MAX_ROOMS) {
      if (currentGuestsOption.value !== '0') {
        currentGuestsOption.disabled = true;
      }else {
        currentGuestsOption.disabled = false;
        guestsSelect.value = currentGuestsOption.value;
      }
    }
  }
};

const onGuestsSelectChange = (evt) => {};

form.classList.add('ad-form--disabled');
disableForm(formFieldsets);

priceInput.min = HOUSING_STARTING_PRICE[selectedHousing.value];
priceInput.placeholder = HOUSING_STARTING_PRICE[selectedHousing.value];
roomsSelect.value = guestsSelect.value;

housingSelect.addEventListener('change', onHousingSelectChange);
timeFieldset.addEventListener('change', onTimeFieldsetChange);
roomsSelect.addEventListener('change', onRoomsSelectChange);
guestsSelect.addEventListener('change', onGuestsSelectChange);

export {form, formFieldsets};