import {disableForm} from './util.js';

const MAX_ROOMS = '100';
const INVALID_OUTLINE = '2px solid red';
const HOUSING_STARTING_PRICE = {
  'bungalow': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000,
};

const form = document.querySelector('.ad-form');
const formFieldsets = form.children;
const address = form.querySelector('#address');
const housingSelect = form.querySelector('#type');
const selectedHousing = housingSelect.querySelector('[selected]');
const priceInput = form.querySelector('#price');
const timeFieldset = form.querySelector('.ad-form__element--time');
const checkInSelect = timeFieldset.querySelector('#timein');
const checkoutSelect = timeFieldset.querySelector('#timeout');
const roomsSelect = form.querySelector('#room_number');
const guestsSelect = form.querySelector('#capacity');
const allFormInputs = form.querySelectorAll('input');



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

const onGuestsSelectChange = (evt) => {
  const roomsOptions = roomsSelect.children;
  for (let i = 0; i < roomsOptions.length; i++) {
    const currentRoomOption = roomsOptions[i];
    if (currentRoomOption.value < evt.target.value || currentRoomOption.value === MAX_ROOMS) {
      currentRoomOption.disabled = true;
    }else {
      currentRoomOption.disabled = false;
      roomsSelect.value = currentRoomOption.value;
    }
    if (evt.target.value === '0') {
      if (currentRoomOption.value !== MAX_ROOMS) {
        currentRoomOption.disabled = true;
      }else {
        currentRoomOption.disabled = false;
        roomsSelect.value = currentRoomOption.value;
      }
    } 
  }
};

const onGuestsSelectInvalid =  () => {
  if (guestsSelect.value > roomsSelect.value) {
    guestsSelect.setCustomValidity('Мест не должно быть больше комнат!');
    guestsSelect.style.outline = INVALID_OUTLINE;
  }else {
    guestsSelect.setCustomValidity('');
  }
}; 

const onInputInvalid = (evt) => {
  evt.target.style.outline = INVALID_OUTLINE;
};

form.classList.add('ad-form--disabled');
disableForm(formFieldsets);

priceInput.min = HOUSING_STARTING_PRICE[selectedHousing.value];
priceInput.placeholder = HOUSING_STARTING_PRICE[selectedHousing.value];
if (guestsSelect.value > roomsSelect.value) {
  guestsSelect.setCustomValidity('!');
  console.log('hiiiiiiii');
}

for (let i = 0; i < allFormInputs.length; i++) {
  allFormInputs[i].addEventListener('invalid', onInputInvalid);
}
housingSelect.addEventListener('change', onHousingSelectChange);
timeFieldset.addEventListener('change', onTimeFieldsetChange);
roomsSelect.addEventListener('change', onRoomsSelectChange);
guestsSelect.addEventListener('change', onGuestsSelectChange);
guestsSelect.addEventListener('invalid', onGuestsSelectInvalid);

export {form, formFieldsets, address};