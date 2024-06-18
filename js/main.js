import { form, showFormSubmitSuccessMessage, showFormSubmitError, setInitialPriceInputAttributes, titleInput, priceInput, guestsSelect } from './form.js';
import { mainMarker, DefaultCoordinates, mapFilters } from './map.js';
import { sendData } from './api.js';

const onFormSubmit = (evt) => {
  evt.preventDefault();
  sendData(
    () => {
      evt.target.reset();
      mapFilters.reset();
      mainMarker.setLatLng(DefaultCoordinates);
      showFormSubmitSuccessMessage()
    },
    () => {
      showFormSubmitError();
    },
    new FormData(evt.target)); 
};

form.addEventListener('submit', onFormSubmit);

form.addEventListener('reset', () => {
  mainMarker.setLatLng(DefaultCoordinates);
  mapFilters.reset();
  titleInput.style.outline = 'none';
  priceInput.style.outline = 'none';
  guestsSelect.style.outline = 'none';
  setInitialPriceInputAttributes();
});
