import { disableForm, isEscEvent, isEnterEvent } from './util.js';

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
const formResetButton = form.querySelector('.ad-form__reset')
//const roomsOptions = roomsSelect.children;
//const guestsOptions = guestsSelect.children;
const formSubmitErrorTemplate = document.querySelector('#error').content.querySelector('.error');
const formSubmitError = formSubmitErrorTemplate.cloneNode(true); 
const formErrorButton = formSubmitError.querySelector('.error__button');
const formSubmitSuccessMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const formSubmitSuccessMessage = formSubmitSuccessMessageTemplate.cloneNode(true);

const onHousingSelectChange = (evt) => {
  priceInput.value = '';
  priceInput.placeholder = HOUSING_STARTING_PRICE[evt.target.value];
  priceInput.min = HOUSING_STARTING_PRICE[evt.target.value];
};

const onTimeFieldsetChange = (evt) => {
  checkoutSelect.value = evt.target.value;
  checkInSelect.value = evt.target.value;
};

/*const onRoomsSelectChange = (evt) => {
  for (let guestsOption of guestsOptions) {
    if (guestsOption.value > evt.target.value || guestsOption.value === '0') {
      guestsOption.disabled = true;
    }else {
      guestsOption.disabled = false;
      guestsSelect.value = guestsOption.value;
    }
    if (evt.target.value === MAX_ROOMS) {
      if (guestsOption.value !== '0') {
        guestsOption.disabled = true;
      }else {
        guestsOption.disabled = false;
        guestsSelect.value = guestsOption.value;
      }
    }
  }
};

const onGuestsSelectChange = (evt) => {
  for (let roomsOption of roomsOptions) {
    if (roomsOption.value < evt.target.value || roomsOption.value === MAX_ROOMS) {
      roomsOption.disabled = true;
    }else {
      roomsOption.disabled = false;
      roomsSelect.value = roomsOption.value;
    }
    if (evt.target.value === '0') {
      if (roomsOption.value !== MAX_ROOMS) {
        roomsOption.disabled = true;
      }else {
        roomsOption.disabled = false;
        roomsSelect.value = roomsOption.value;
      }
    } 
  }
};

const onGuestsSelectInvalid =  () => {
  guestsSelect.style.outline = INVALID_OUTLINE;
  if (guestsSelect.value <= roomsSelect.value) {
    guestsSelect.setCustomValidity('');
  }
}; 
*/
const onInputInvalid = (evt) => {
  evt.target.style.outline = INVALID_OUTLINE;
};

const showFormSubmitError = () => {
  document.body.appendChild(formSubmitError);

  formErrorButton.addEventListener('click', onformErrorButtonClick);
  document.addEventListener('click', onFormSubmitErrorClick);
  document.addEventListener('keydown', onFormSumbitErrorEscKeydown);
  document.addEventListener('keydown', onFormSumbitErrorEnterKeydown);
};

const closeFormSubmitError = () => {
  formSubmitError.remove();

  formErrorButton.removeEventListener('click', onformErrorButtonClick);
  document.removeEventListener('click', onFormSubmitErrorClick);
  document.removeEventListener('keydown', onFormSumbitErrorEscKeydown);
  document.removeEventListener('keydown', onFormSumbitErrorEnterKeydown);
};

const onformErrorButtonClick = () => {
  closeFormSubmitError();
};

const onFormSubmitErrorClick = () => {
  closeFormSubmitError();
};

const onFormSumbitErrorEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeFormSubmitError();
  }
};

const onFormSumbitErrorEnterKeydown = (evt) => {
  if(isEnterEvent(evt)) {
    evt.preventDefault();
  }
};

const showFormSubmitSuccessMessage = () => {
  document.body.appendChild(formSubmitSuccessMessage);
  
  document.addEventListener('click', onFormSubmitSuccessMessageClick);
  document.addEventListener('keydown', onFormSubmitSuccessMessageEscKeydown);
  document.addEventListener('keydown', onFormSubmitSuccessMessageEnterKeydown);
}; 

const closeFormSubmitSuccessMessage = () => {
  formSubmitSuccessMessage.remove();

  document.removeEventListener('click', onFormSubmitSuccessMessageClick);
  document.removeEventListener('keydown', onFormSubmitSuccessMessageEscKeydown);
  document.removeEventListener('keydown', onFormSubmitSuccessMessageEnterKeydown);
};

const onFormSubmitSuccessMessageClick = () => {
  closeFormSubmitSuccessMessage();
};

const onFormSubmitSuccessMessageEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeFormSubmitSuccessMessage();
  }
};

const onFormSubmitSuccessMessageEnterKeydown = (evt) => {
  if (isEnterEvent(evt)) {
    evt.preventDefault();
  }
};

form.classList.add('ad-form--disabled');
disableForm(formFieldsets);

priceInput.min = HOUSING_STARTING_PRICE[selectedHousing.value];
priceInput.placeholder = HOUSING_STARTING_PRICE[selectedHousing.value];

if (guestsSelect.value > roomsSelect.value) {
  guestsSelect.setCustomValidity('Мест не должно быть больше комнат!')
}

for (let formInput of allFormInputs) {
  formInput.addEventListener('invalid', onInputInvalid);
}
housingSelect.addEventListener('change', onHousingSelectChange);
timeFieldset.addEventListener('change', onTimeFieldsetChange);
//roomsSelect.addEventListener('change', onRoomsSelectChange);
//guestsSelect.addEventListener('change', onGuestsSelectChange);
//guestsSelect.addEventListener('invalid', onGuestsSelectInvalid);

export { form, formFieldsets, address, formResetButton, showFormSubmitSuccessMessage, showFormSubmitError };