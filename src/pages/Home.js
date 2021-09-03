import React from 'react';
import MainWrapper from '../components/Layout/MainWrapper';
import CurrentWeather from '../components/weather/CurrentWeather';
import FiveDaysForecast from '../components/weather/FiveDaysForecast';
import Autocomplete from '../components/search/Autocomplete';

import 'antd/dist/antd.css';

function Home() {
  return (
    <div>
      <Autocomplete />
      <CurrentWeather />
      <MainWrapper>
        <FiveDaysForecast />
      </MainWrapper>
    </div>
  );
}

export default Home;
