import './css/styles.css';
import { fetchCountries } from './js/fetchCountries.js';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const DEBOUNCE_DELAY = 300;

const refs = {
  searchInput: document.querySelector('#search-box'),
  searchList: document.querySelector('.country-list'),
  countryCard: document.querySelector('.country-info'),
};

refs.searchInput.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(event) {
  const inputText = event.target.value.trim();

  fetchCountries(inputText)
    .then(data => {
      if (data.length === 1) {
        refs.countryCard.innerHTML = renderCountryCard(data[0]);
      } else if (data.length > 1 && data.length < 11) {
        refs.searchList.innerHTML = renderCountryList(data);
      } else {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
      clearSearchRequest();
    });
}

// =============================================================================================
// Сторонние функции для отросивки

function renderCountryCard({ languages, flags, name, capital, population }) {
  refs.countryCard.innerHTML = '';

  return `<div class="country-card">
  <li class="country-card__item">
    <img class="country-card__img" src="${flags.svg}"  alt="${
    name.official
  }"  width="50px />
    <p class="country-card__title">${name.official}</p>
    <p class="country-card__text">Capital: <span>${capital}</span></p>
    <p class="country-card__text">Population: <span>${population}</span></p>
    <p class="country-card__text">Languages: <span>${Object.values(
      languages
    )}</span></p>
  </li>
</div>`;
}
function renderCountryList(data) {
  refs.countryCard.innerHTML = '';
  return data
    .map(
      ({ flags, name }) => `
        <li class="country-list__item">
            <img src="${flags.svg}" class="country-list__image" width="50" alt="${name.official}">
            <p class="country-list__name">${name.official}</p>
        </li>`
    )
    .join('');
}
function clearSearchRequest() {
  refs.searchList.innerHTML = '';
  refs.countryCard.innerHTML = '';
}

// ======================================
// Оформить
// Проверить при остановке ввода и продолжении работоспособность
