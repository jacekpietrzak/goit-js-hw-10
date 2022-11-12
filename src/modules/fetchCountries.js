import Notiflix from 'notiflix';
const COUNTRIES_LIST_URL = 'https://restcountries.com/v3.1/name/';
const countryList = document.querySelector('.country-list');

const fetchCountries = name => {
  let countriesListMarkup = '';
  let languages = '';

  fetch(
    COUNTRIES_LIST_URL +
      name +
      '?fields=name,capital,population,languages,flags'
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(countries => {
      if (countries.length > 10) {
        countryList.innerHTML = '';
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        console.log(
          'Too many matches found. Please enter a more specific name.'
        );
      }

      if (countries.length >= 2 && countries.length <= 10) {
        countries.forEach(country => {
          countriesListMarkup += `
        <li class="listItem">
        <img src="${country.flags.svg}" alt="Flag of ${country.name.common}"class="flag">
        <h3 class="title">${country.name.official}</h3>
        </li>`;
        });

        countryList.innerHTML = countriesListMarkup;
        // console.log('miedzy 2 a 10', countries);
      }

      if (countries.length === 1) {
        countries.forEach(country => {
          languages += Object.values(country.languages);
          countriesListMarkup += `
        <li class="listItem">
        <img src="${country.flags.svg}" alt="Flag of ${country.name.common}"class="flag">
        <h3 class="singleTitle">${country.name.official}</h3>
        </li>
        <li class="listItem"><b>Capital:</b> ${country.capital}</li>
        <li class="listItem"><b>Population:</b> ${country.population}</li>
        <li class="listItem"><b>Languages:</b> ${languages}</li>
        `;
        });

        countryList.innerHTML = countriesListMarkup;
        // console.log('dokladnie 1', countries);
      }
    })
    .catch(error => {
      //   console.log(error);
      countryList.innerHTML = '';
      Notiflix.Notify.failure('Oops, there is no countries with that name');
      console.log('Oops, there is no countries with that name');
    });
};

export { fetchCountries };
