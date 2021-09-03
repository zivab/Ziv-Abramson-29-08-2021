import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = 'https://dataservice.accuweather.com/';
const API_KEY = 'V9hAcxn7NezAOsIkYwSbQr4d0i7DBexY';

const API_AUTOCOMPLETE = BASE_URL + 'locations/v1/cities/autocomplete';
const API_CURRENT_WEATHER = BASE_URL + 'currentconditions/v1/';
const API_5DAYSFORECAST_WEATHER = BASE_URL + 'forecasts/v1/daily/5day/';

class WeatherService {
  getCurrentWeather = (chosenLocationId) => {
    return axios
      .get(
        `${API_CURRENT_WEATHER}${chosenLocationId}?apikey=${API_KEY}&language=en-us`
      )
      .then((res) => {
        return (res && res.data) || undefined;
      })
      .catch((err) => {
        const errorMsg =
          err.message +
          " :Can't get the current weather response from the api request";
        toast.error(errorMsg, {
          className: 'error-toast',
          draggable: true,
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  getAutocompletionData = (searchValue) => {
    return axios
      .get(`${API_AUTOCOMPLETE}?apikey=${API_KEY}&q=${searchValue}`)
      .then((res) => {
        return (res && res.data) || undefined;
      })
      .catch((err) => {
        const errorMsg =
          err.message +
          " :Can't get the autocompletion data response from the api request";
        toast.error(errorMsg, {
          className: 'error-toast',
          draggable: true,
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

  getFiveDaysForeCastData = (chosenLocationId) => {
    return axios
      .get(
        `${API_5DAYSFORECAST_WEATHER}${chosenLocationId}?apikey=${API_KEY}&language=en-us&metric=true`
      )
      .then((res) => {
        return (res && res.data.DailyForecasts) || undefined;
      })
      .catch((err) => {
        const errorMsg =
          err.message +
          " :Can't get the five days forecast data response from the api request";
        toast.error(errorMsg, {
          className: 'error-toast',
          draggable: true,
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };
}

export default new WeatherService();
