import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { URLs } from '../services/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoriteFAQContext = createContext();

export const useFaqFavorites = () => {
  return useContext(FavoriteFAQContext);
};

export const FavoriteFAQProvider = ({ children }) => {
  const [userFavorites, setUserFavorites] = useState([]);

  useEffect(() => {
    // Backend'den favori soruları almak
    const fetchFavorites = async () => {
      try {
        const userDataString = await AsyncStorage.getItem('userDataResponse');
        const userData = userDataString ? JSON.parse(userDataString) : null;
        const userId = userData ? userData._id : null;
        
        if (userId) {
          const response = await axios.get(`${URLs.BASE_URL}users/${userId}`);
          setUserFavorites(response.data.userFavoriteFaqs || []);
        }
      } catch (error) {
        console.error('Error fetching favorite FAQs:', error);
      }
    };

    fetchFavorites();
  }, []);

  const addFavorite = (faqId) => {
    setUserFavorites((prevFavorites) => [...prevFavorites, faqId]);
  };

  const removeFavorite = (faqId) => {
    setUserFavorites((prevFavorites) => prevFavorites.filter(id => id !== faqId));
  };

  return (
    <FavoriteFAQContext.Provider value={{ userFavorites, addFavorite, removeFavorite }}>
      {children}
    </FavoriteFAQContext.Provider>
  );
};
