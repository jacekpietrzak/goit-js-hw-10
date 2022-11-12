import './css/styles.css';
import Notiflix from 'notiflix';
const debounce = require('lodash.debounce');
import * as fetchCountriesModule from './modules/fetchCountries';

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

const notiflixFailure = text => {
  Notiflix.Notify.failure(text);
};
const notiflixSuccess = text => {
  Notiflix.Notify.success(text);
};
const notiflixInfo = text => {
  Notiflix.Notify.info(text);
};

searchBox.addEventListener(
  'input',
  debounce(event => {
    const searchBoxValue = event.target.value;
    if (searchBoxValue === '') {
      countryList.innerHTML = '';
      return;
    }
    // console.log(searchBoxValue.trim());

    fetchCountriesModule.fetchCountries(searchBoxValue.trim());
  }, DEBOUNCE_DELAY)
);
