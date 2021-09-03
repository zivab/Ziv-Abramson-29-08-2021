import { createContext, useState } from 'react';

const AppContext = createContext({
  favorites: [],
  totalFavorites: 0,
  chosenLocation: null,
  localizedName: null,
  addFavorite: (favoriteWeather) => {},
  removeFavorite: (chosenLocationId) => {},
  itemIsFavorite: (chosenLocationId) => {},
  chosenLocationHandler: (chosenLocation) => {},
  localizedNameHandler: (cityName) => {},
});

export function AppContextProvider(props) {
  const [userFavorites, setUserFavorites] = useState([]);
  const [chosenCity, setChosenCity] = useState('');
  const [userChosenLocation, setUserChosenLocation] = useState('215854');

  function addFavoriteHandler(favoriteWeather) {
    setUserFavorites((prevUserFavorites) => {
      return prevUserFavorites.concat(favoriteWeather);
    });
  }

  function removeFavoriteHandler(chosenLocationId) {
    setUserFavorites((prevUserFavorites) => {
      return prevUserFavorites.filter(
        (location) => location.id !== chosenLocationId
      );
    });
  }
  function itemIsFavoriteHandler(chosenLocationId) {
    return userFavorites.some((location) => location.id === chosenLocationId);
  }

  function changeChosenLocationHandler(chosenLocation) {
    setUserChosenLocation(chosenLocation);
  }
  function changeLocalizedNameHandler(cityName) {
    setChosenCity(cityName);
  }

  const context = {
    favorites: userFavorites,
    totalFavorites: userFavorites.length,
    chosenLocation: userChosenLocation,
    localizedName: chosenCity,
    addFavorite: addFavoriteHandler,
    removeFavorite: removeFavoriteHandler,
    itemIsFavorite: itemIsFavoriteHandler,
    chosenLocationHandler: changeChosenLocationHandler,
    localizedNameHandler: changeLocalizedNameHandler,
  };

  return (
    <AppContext.Provider value={context}>{props.children}</AppContext.Provider>
  );
}

export default AppContext;
