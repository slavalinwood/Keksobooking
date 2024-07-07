import { form, showFormSubmitSuccessMessage, showFormSubmitError,
  setInitialPriceInputAttributes, titleInput, priceInput,
  guestsSelect } from './form.js';
import { mainMarker, DefaultCoordinates, mapFilters } from './map.js';
import { sendData } from './api.js';
import { resetPreview, avatarPreview, photoPreview } from './photo-preview.js';
import { removeInvalidInputStyle } from './util.js';

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

  removeInvalidInputStyle(titleInput);
  removeInvalidInputStyle(priceInput);
  removeInvalidInputStyle(guestsSelect);

  resetPreview(avatarPreview);
  resetPreview(photoPreview);

  setInitialPriceInputAttributes();
});
