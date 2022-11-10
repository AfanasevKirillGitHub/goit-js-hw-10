import { refs } from './refs';
export { renderCountryCard, renderCountryList, clearSearchRequest };

function renderCountryCard({ name, capital, population, flags, languages }) {
  refs.searchList.innerHTML = '';

  return `
    <img class="country-card__img" src="${flags.svg}" alt="${
    name.official
  }" width="100px" />
    <p class="country-card__title"> ${name.official} </p>
    <p class="country-card__text">Capital: <span>${capital}</span></p>
    <p class="country-card__text">Population: <span>${population}</span></p>
    <p class="country-card__text">Languages: <span>${Object.values(
      languages
    )}</span></p>`;
}
function renderCountryList(data) {
  refs.countryCard.innerHTML = '';
  return data
    .map(
      ({ name, flags }) => `
        <li class="country-list__item">
            <img src="${flags.svg}" class="country-list__image" width="60px" alt="${name.official}">
            <p class="country-list__name">${name.official}</p>
        </li>`
    )
    .join('');
}
function clearSearchRequest() {
  refs.searchList.innerHTML = '';
  refs.countryCard.innerHTML = '';
}
