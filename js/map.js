import { disableForm } from "./form.js";

const mapFilters = document.querySelector('.map__filters');
const mapFiltersSelects = mapFilters.children;

mapFilters.classList.add('map__filters--disabled');
disableForm(mapFiltersSelects);