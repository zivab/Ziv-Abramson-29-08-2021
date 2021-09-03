import React, { useEffect, useState, useContext } from 'react';

import AppContext from '../../store/app-context.js';
import { List, Card } from 'antd';
import WeatherService from '../../services/Api';

function FiveDaysForecast() {
  const [fiveDaysForecast, setFiveDaysForecast] = useState(undefined);

  const appCtx = useContext(AppContext);
  let chosenLocationId = appCtx.chosenLocation;

  useEffect(() => {
    WeatherService.getFiveDaysForeCastData(chosenLocationId).then(
      (FiveDaysForecastResponse) => {
        setFiveDaysForecast(FiveDaysForecastResponse);
      }
    );
  }, [chosenLocationId]);

  const WEATHER_ICONS = `${process.env.PUBLIC_URL}/assets/WeatherIcons/`;

  const data = fiveDaysForecast;

  const { Meta } = Card;

  const dateToDayName = (date) => {
    return new Date(date.toString()).toLocaleString('en-US', {
      weekday: 'short',
    });
  };

  return (
    <div>
      <List
        grid={{ gutter: 16, xs: 2, sm: 3, md: 5 }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Card title={dateToDayName(item.Date)}>
              <img
                src={WEATHER_ICONS + `${item.Day.Icon}.png`}
                alt='Current weather icon'
              />
              <Meta
                title={item.Temperature.Maximum.Value}
                description={
                  item.Temperature.Maximum.Value +
                  '°' +
                  '/' +
                  item.Temperature.Minimum.Value +
                  '°' +
                  '' +
                  item.Temperature.Minimum.Unit
                }
              />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
}

export default FiveDaysForecast;
