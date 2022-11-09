export { fetchCountries };

function fetchCountries(name) {
  const BASE_URL = 'https://restcountries.com/v3.1/name/';
  const FILTERS = 'fields=name,capital,population,flags,languages';

  return fetch(`${BASE_URL}/${name}?${FILTERS}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
