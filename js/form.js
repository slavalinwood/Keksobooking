const HOUSING_STARTING_PRICE = {
  'bungalow': 10000,
  'flat': 5000,
  'house': 15000,
  'palace': 50000,
};

const form = document.querySelector('.ad-form');
const formFieldsets = form.children;
const housingSelect = form.querySelector('#type');
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

for (let i = 0; i < formFieldsets.length; i++) {
  formFieldsets[i].disabled = true;
}

housingSelect.addEventListener('change', onHousingSelectChange);
timeFieldset.addEventListener('change', onTimeFieldsetChange);
