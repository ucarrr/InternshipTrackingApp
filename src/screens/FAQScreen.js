import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Alert, Dimensions } from 'react-native';
import { Searchbar, TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import ExpandableList from '../components/ExpandableList';
import { URLs, databases } from '../services/index';

const windowWidth = Dimensions.get('window').width;

export default function FAQScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [fabData, setFabData] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);
  const [userId, setUserId] = useState('');

 
  const fetchFAQs = async () => {
    try {
      const url = `${URLs.BASE_URL}${databases.FAQ}`;
      const response = await axios.get(url);
      setFabData(response.data);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      throw error;
    }
  };

  
  const fetchUserInfo = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userDataResponse');
      const userData = userDataString ? JSON.parse(userDataString) : null;
      if (!userData) throw new Error('No user data found');

      setUserId(userData._id);

      const userUrl = `${URLs.BASE_URL}users/${userData._id}`;
      const userResponse = await axios.get(userUrl);
      setUserFavorites(userResponse.data.userFavoriteFaqs);
      console.log(userFavorites)

      await fetchFAQs();
    } catch (error) {
      console.error('Error fetching user profile:', error);
      Alert.alert('Error', 'Failed to load user data');
    }
  };

 
  useFocusEffect(
    useCallback(() => {
      console.log('FAQScreen is focused new');
      fetchUserInfo();
    }, [])
  );

 
  const handleSearch = (text) => {
    setSearchQuery(text);
    const results = fabData.filter((doc) =>
      doc.question.toLowerCase().includes(text.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Sorular</Text>
        <TouchableRipple
          onPress={() => {
            navigation.navigate('FavoriteFaqScreen', { userId });
          }}
        >
          <View style={styles.subtitle}>
            <Text style={styles.subtitleText}>Favoriler</Text>
            <Icon name="heart" color="#DB6D2D" size={25} />
          </View>
        </TouchableRipple>
      </View>

      <View style={[styles.searchContainer, { width: windowWidth * 0.9 }]}>
        <Searchbar
          theme={{ colors: { primary: 'green' } }}
          placeholder="Search"
          onChangeText={handleSearch}
          value={searchQuery}
          iconColor="#DB6D2D"
          borderColor="#0063A9"
          style={{ backgroundColor: '#f5f5f5' }}
          onIconPress={() => handleSearch(searchQuery)}
          inputStyle={{ color: '#0063A9', fontSize: 16 }}
          placeholderTextColor={'#0063A9'}
        />
      </View>

      <ExpandableList
        data={searchQuery ? searchResults : fabData}
        userFavorites={userFavorites}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'white',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
    justifyContent: 'center',
    width: '100%',
  },
  header: {
    width: '80%',
    marginTop: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#DB6D2D',
  },
  subtitle: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#DB6D2D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitleText: {
    color: '#DB6D2D',
    fontWeight: '600',
    fontSize: 14,
    marginRight: 5,
  },
});
