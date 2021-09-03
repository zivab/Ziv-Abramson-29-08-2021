import React, { useEffect, useState, useContext } from 'react';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import classes from './CurrentWeather.module.css';
import AppContext from '../../store/app-context.js';
import { Button } from 'antd';
import WeatherService from '../../services/Api';

function CurrentWeather() {
  const [currentWeather, setCurrentWeather] = useState(undefined);

  const appCtx = useContext(AppContext);
  let chosenLocationId = appCtx.chosenLocation;
  let choesnCity = appCtx.localizedName;
  const CHOSENCITY = choesnCity ? choesnCity : 'Tel Aviv';

  useEffect(() => {
    WeatherService.getCurrentWeather(chosenLocationId).then(
      (currentWeatherResponse) => {
        setCurrentWeather(currentWeatherResponse);
      }
    );
  }, [chosenLocationId]);

  const WEATHER_ICONS = `${process.env.PUBLIC_URL}/assets/WeatherIcons/`;

  const currentWeatherCheck =
    currentWeather && currentWeather[0] ? currentWeather[0] : undefined;
  const icon = currentWeatherCheck ? currentWeather[0].WeatherIcon : 'NoImage';
  const text = currentWeatherCheck ? currentWeather[0].WeatherText : '';

  const noImgStyle =
    icon === 'NoImage' ? { height: '70px', borderRadius: '15px' } : {};

  const unit = currentWeatherCheck
    ? currentWeather[0].Temperature.Metric.Unit
    : '';
  const value = currentWeatherCheck
    ? currentWeather[0].Temperature.Metric.Value
    : '';

  const itemIsFavorite = appCtx.itemIsFavorite(chosenLocationId);

  function toggleFavoriteStatusHandler() {
    if (itemIsFavorite) {
      appCtx.removeFavorite(chosenLocationId);
    } else {
      appCtx.addFavorite({
        id: chosenLocationId,
        title: CHOSENCITY,
        description: text,
        image: WEATHER_ICONS + `${icon}.png`,
        Temperature: `${value}°${unit}`,
      });
    }
  }
  const testicon = itemIsFavorite ? (
    <HeartFilled style={{ fontSize: '25px', color: '#fb2626' }} />
  ) : (
    <HeartOutlined style={{ fontSize: '25px', color: '#fb2626' }} />
  );

  return (
    <div>
      <div className={classes.currentWeather__wrapper}>
        <div className={classes.current__weather}>
          <img
            src={WEATHER_ICONS + `${icon}.png`}
            style={noImgStyle}
            alt='Current weather icon'
          />
          <h3 className={classes.right__spacer}>{CHOSENCITY}</h3>
          <h3>
            {value}°{unit}
          </h3>
        </div>
        <div>
          <Button
            onClick={toggleFavoriteStatusHandler}
            type='default'
            icon={testicon}
          >
            {itemIsFavorite ? 'Remove from Favorites' : 'To Favorites'}
          </Button>
        </div>
      </div>
      <h1 className={classes.weather__text}>{text}</h1>
    </div>
  );
}

export default CurrentWeather;
