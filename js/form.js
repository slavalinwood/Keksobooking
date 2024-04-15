import {mapCanvas} from './advert.js'

const form = document.querySelector('.ad-form');
const housingSelect = form.querySelector('#type');
const priceInput = form.querySelector('#price');
const checkInSelect = form.querySelector('#timein');
const checkoutSelect = form.querySelector('#timeout');

const advertsList = Object.entries(mapCanvas.children);

