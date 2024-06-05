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
const address = form.querySelector('#address');
const housingSelect = form.querySelector('#type');
const selectedHousing = housingSelect.querySelector('[selected]');
const priceInput = form.querySelector('#price');
const timeFieldset = form.querySelector('.ad-form__element--time');
const checkInSelect = timeFieldset.querySelector('#timein');
const checkoutSelect = timeFieldset.querySelector('#timeout');
const roomsSelect = form.querySelector('#room_number');
const guestsSelect = form.querySelector('#capacity');
const guestsSelectOptions = guestsSelect.children;
const allFormInputs = form.querySelectorAll('input');
const formResetButton = form.querySelector('.ad-form__reset')
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

const validateGuestsRoomsSelects = () => {
  if(roomsSelect.value === MAX_ROOMS) {
    for (let option of guestsSelectOptions) {
      if (option.value === '0') {
        option.selected = true;
      }else {
        option.disabled = true;
      }
    }
  }else {
    for (let option of guestsSelectOptions) {
      option.disabled = false;
    }
  }

  if (roomsSelect.value < guestsSelect.value && guestsSelect.value !== '0') {
    guestsSelect.setCustomValidity('Мест не должно быть больше комнат!')
    guestsSelect.style.outline = INVALID_OUTLINE;
  }else if (roomsSelect.value !== MAX_ROOMS && guestsSelect.value === '0') {
    guestsSelect.setCustomValidity('Эта опция доступна только при максимальном количестве комнат!')
    guestsSelect.style.outline = INVALID_OUTLINE;
  } else {
    roomsSelect.setCustomValidity('');
    roomsSelect.style.outline = 'none';
    guestsSelect.setCustomValidity('');
    guestsSelect.style.outline = 'none';
  }
  roomsSelect.reportValidity();
  guestsSelect.reportValidity();
}

const onRoomsSelectChange = () => {
  validateGuestsRoomsSelects();
};

const onGuestsSelectChange = () => {
  validateGuestsRoomsSelects();
};

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

priceInput.min = HOUSING_STARTING_PRICE[selectedHousing.value];
priceInput.placeholder = HOUSING_STARTING_PRICE[selectedHousing.value];

for (let formInput of allFormInputs) {
  formInput.addEventListener('invalid', onInputInvalid);
}
housingSelect.addEventListener('change', onHousingSelectChange);
timeFieldset.addEventListener('change', onTimeFieldsetChange);
roomsSelect.addEventListener('change', onRoomsSelectChange);
guestsSelect.addEventListener('change', onGuestsSelectChange);

validateGuestsRoomsSelects();

form.classList.add('ad-form--disabled');
disableForm(form);

export { form, address, formResetButton, showFormSubmitSuccessMessage, showFormSubmitError };