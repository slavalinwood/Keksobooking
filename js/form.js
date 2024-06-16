import { disableForm, enableForm, isEscEvent, isEnterEvent, setNumberInputAttributes } from './util.js';

const MAX_ROOMS = '100';
const INVALID_OUTLINE = '2px solid red';

const housingStartingPrice = {
  'bungalow': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000,
};

const form = document.querySelector('.ad-form');
const formSubmitButton = form.querySelector('.ad-form__submit');
const title = form.querySelector('#title');
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
const formSubmitErrorTemplate = document.querySelector('#error').content.querySelector('.error');
const formSubmitError = formSubmitErrorTemplate.cloneNode(true); 
const formErrorButton = formSubmitError.querySelector('.error__button');
const formSubmitSuccessMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const formSubmitSuccessMessage = formSubmitSuccessMessageTemplate.cloneNode(true);

const onHousingSelectChange = (evt) => {
  priceInput.value = '';
  setNumberInputAttributes(priceInput, housingStartingPrice[evt.target.value]);
};

const onTimeFieldsetChange = (evt) => {
  checkoutSelect.value = evt.target.value;
  checkInSelect.value = evt.target.value;
};

const validateGuestsRoomsSelects = () => {
  if(roomsSelect.value === MAX_ROOMS) {
    for (let option of guestsSelectOptions) {
      (option.value === '0') ? option.selected = true : option.disabled = true;
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

const setInitialPriceInputAttributes = () => {
  setNumberInputAttributes(priceInput, housingStartingPrice[selectedHousing.value]);
};

const disableAdvertForm = () => {
  form.classList.add('ad-form--disabled');
  disableForm(form);
};

const enableAdvertForm = () => {
  form.classList.remove('ad-form--disabled');
  enableForm(form);
}

housingSelect.addEventListener('change', onHousingSelectChange);
timeFieldset.addEventListener('change', onTimeFieldsetChange);
roomsSelect.addEventListener('change', onRoomsSelectChange);
guestsSelect.addEventListener('change', onGuestsSelectChange);
priceInput.addEventListener('invalid', onInputInvalid);
title.addEventListener('invalid', onInputInvalid);

setInitialPriceInputAttributes();
disableAdvertForm();

export { form, address, showFormSubmitSuccessMessage, showFormSubmitError, validateGuestsRoomsSelects, setInitialPriceInputAttributes, formSubmitButton, housingSelect, enableAdvertForm };