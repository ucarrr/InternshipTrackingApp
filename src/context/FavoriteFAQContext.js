import React, { createContext, useState, useContext } from 'react';

const FavoriteFAQContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (faqId) => {
    setFavorites([...favorites, faqId]);
  };

  const removeFavorite = (faqId) => {
    setFavorites(favorites.filter(id => id !== faqId));
  };

  return (
    <FavoriteFAQContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoriteFAQContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoriteFAQContext);