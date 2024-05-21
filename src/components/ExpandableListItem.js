import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {URLs, databases, USER} from '../services/index';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const widthContent = windowWidth * 0.9;
const widthFav = windowWidth * 0.2;

const ExpandableListItem = ({ item, userFavorites,onFavoriteChange }) => {
  const [expanded, setExpanded] = useState(false);
  
  const [userId, setUserId] = useState(null);
  const [favorite, setFavorite] = useState(userFavorites.includes(item._id));

  console.log(
    'ExpandableListItem: Question' + item.question + ' Answer ' + item.answer,
  );

  useEffect(() => {
    fetchUserInfo();
  }, []);
  const fetchUserInfo = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userDataResponse');
      const userData = userDataString ? JSON.parse(userDataString) : null;

      console.log('User Profile:', userData._id);
      setUserId(userData._id);
      return userData;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      Alert.alert('Error', 'Failed to load user data');
    }
  };

  const handleFavoriteChange = async (faqId, add) => {
    try {
      if (add) {
        await addFavorite(userId, faqId);
      } else {
        await removeFavorite(userId, faqId);
      }
      const response = await axios.get(`${URLs.BASE_URL}users/${userId}`);
      console.log("handleFavoriteChange: "+ response)
      console.log("esponse.data.userFavoriteFaqs: "+ response.data.userFavoriteFaqs)
      setFavorite(response.data.userFavoriteFaqs);
    } catch (error) {
      console.error('Error updating favorite status:', error);
    }
  };


  // Favori ekle
  const addFavorite = async (userId, faqId) => {
    console.log("out removeFavorite URL: "+  `${URLs.BASE_URL}users/${userId}/addFavoriteFab/${faqId}`)
    try {
      const response = await axios.post(
        `${URLs.BASE_URL}users/${userId}/addFavoriteFab/${faqId}`,
      );
      console.log("removeFavorite URL: "+  `${URLs.BASE_URL}users/${userId}/addFavoriteFab/${faqId}`)
      return response.data;
    } catch (error) {
      console.error('Error adding favorite:', error);
      throw error;
    }
  };
  const removeFavorite = async (userId, faqId) => {
    console.log("out removeFavorite URL: "+`${URLs.BASE_URL}users/${userId}/removeFavoriteFab/${faqId}`)
    try {
      const response = await axios.post(
        `${URLs.BASE_URL}users/${userId}/removeFavoriteFab/${faqId}`,
      );
      console.log("removeFavorite URL: "+`${URLs.BASE_URL}users/${userId}/removeFavoriteFab/${faqId}`)
      return response.data;
    } catch (error) {
      console.error('Error removing favorite:', error);
      throw error;
    }
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const toggleFavorite = async (userId, faqId) => {
    if (!userId) {
      Alert.alert('Error', 'User not found');
      return;
    }

    try {
      if (favorite) {
        await handleFavoriteChange(item._id, false);
      } else {
        await handleFavoriteChange(item._id, true);
      }
      setFavorite(!favorite);
    } catch (error) {
      console.error('Error updating favorite status:', error);
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <TouchableOpacity onPress={toggleExpand} style={styles.itemTouchable}>
          <Text style={styles.itemTitle}>{item.question}</Text>
        </TouchableOpacity>
        {expanded && <Text style={styles.itemContent}>{item.answer}</Text>}
      </View>
      <View style={styles.favIcon}>
        <TouchableOpacity onPress={() => toggleFavorite(userId, item._id)}>
          <Icon
            name={favorite ? 'heart' : 'hearto'}
            size={24}
            color={favorite ? '#DB6D2D' : '#0063A9'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: widthContent,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    borderColor: '#0063A9',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignSelf: 'center',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'column',
    marginBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderRadius: 15,
    backgroundColor: 'white',
    width: '90%',
    textAlign: 'left',
  },
  favIcon: {
    width: '10%',
    alignSelf: 'center',
  },
  itemTouchable: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  itemContent: {
    textAlign: 'left',
    marginTop: 10,
    fontSize: 14,
    color: '#666',
  },
  icon: {
    fontWeight: 'bold',
    marginBottom: 5,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: 8,
  },
});

export default ExpandableListItem;
