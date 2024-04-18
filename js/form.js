const HOUSING_STARTING_PRICE = {
  'bungalow': 10000,
  'flat': 5000,
  'house': 15000,
  'palace': 50000,
};

const form = document.querySelector('.ad-form');
const housingSelect = form.querySelector('#type');
const priceInput = form.querySelector('#price');
const checkInSelect = form.querySelector('#timein');
const checkoutSelect = form.querySelector('#timeout');

const onHousingSelectChange = (evt) => {
  priceInput.placeholder = HOUSING_STARTING_PRICE[evt.target.value];
  priceInput.min = HOUSING_STARTING_PRICE[evt.target.value];
  priceInput.value = '';
};

housingSelect.addEventListener('change', onHousingSelectChange);
