import React, { useState, useCallback, useContext } from 'react';

import AppContext from '../../store/app-context.js';
import classes from './Autocomplete.module.css';
import { AutoComplete, Input } from 'antd';
import _ from 'lodash';
import WeatherService from '../../services/Api';
import { toast } from 'react-toastify';

const Autocomplete = () => {
  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);

  const appCtx = useContext(AppContext);

  const debounce = useCallback(
    _.debounce((_searchVal) => {
      let queryValidation = /^^[a-zA-Z_ ]*$/.test(_searchVal);
      if (queryValidation) {
        WeatherService.getAutocompletionData(_searchVal).then(
          (AutocompleteResponse) => {
            var dataSource =
              AutocompleteResponse &&
              AutocompleteResponse.map((item) => ({
                key: item.Key,
                value: item.LocalizedName,
              }));
            setOptions(dataSource);
          }
        );
      } else {
        const errorMsg = 'Searching should be done in English letters only';
        toast.error(errorMsg, {
          className: 'error-toast',
          draggable: true,
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }, 1000),
    []
  );

  const onSearch = (data) => {
    setValue(data);
    debounce(data);
  };

  const onSelect = (data, option) => {
    appCtx.chosenLocationHandler(option.key);
    appCtx.localizedNameHandler(option.value);
  };

  return (
    <div className={classes.autocomplete__wrapper}>
      <AutoComplete
        value={value}
        options={options}
        style={{
          width: 200,
        }}
        onSelect={onSelect}
        onSearch={onSearch}
      >
        <Input.Search size='large' placeholder='City Name' />
      </AutoComplete>
    </div>
  );
};

export default Autocomplete;
