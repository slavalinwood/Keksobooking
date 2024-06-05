import { form, showFormSubmitSuccessMessage, showFormSubmitError } from './form.js';
import { mainMarker, DEFAULT_COORDINATES, mapFilters } from './map.js';
import { sendData } from './api.js';

const onFormSubmit = (evt) => {
  evt.preventDefault();
  sendData(
    () => {
      evt.target.reset();
      mapFilters.reset();
      mainMarker.setLatLng(DEFAULT_COORDINATES);
      showFormSubmitSuccessMessage()
    },
    () => {
      showFormSubmitError();
    },
    new FormData(evt.target)); 
};

form.addEventListener('submit', onFormSubmit);

form.addEventListener('reset', () => {
  mainMarker.setLatLng(DEFAULT_COORDINATES);
  mapFilters.reset();
});
