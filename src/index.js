import './css/styles.css';
import { refs } from './js/refs';
import { fetchCountries } from './js/fetchCountries.js';
import {
  renderCountryCard,
  renderCountryList,
  clearSearchRequest,
} from './js/renderCountries.js';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const DEBOUNCE_DELAY = 300;

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
