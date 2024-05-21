import {
  View,
  TextInput,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {Searchbar, TouchableRipple} from 'react-native-paper';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import {Dimensions} from 'react-native';
import axios from 'axios';
import {URLs, databases, USER} from '../services/index';
import ExpandableList from '../components/ExpandableList';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;

export default function FAQScreen({navigation}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [fabData, setDatafab] = useState([]);

  const [userFavorites, setUserFavorites] = useState([]);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    fetchUserInfo();
  }, []);
  const fetchData = async () => {
    try {
      const url = URLs.BASE_URL + databases.FAQ;
      const response = await axios.get(url);
      console.log('Data:', response.data);
      setDatafab(response.data);
      console.log('Faq Data:', fabData);
      return response.data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  };

  const fetchUserInfo = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userDataResponse');
      const userData = userDataString ? JSON.parse(userDataString) : null;

      setUserFavorites(userData.userFavoriteFaqs);
      console.log('userData.data:' + userData.userFavoriteFaqs);
      console.log('user faq favorite:' + userFavorites);
      fetchData();
    } catch (error) {
      console.error('Error fetching user profile:', error);
      Alert.alert('Error', 'Failed to load user data');
    }
  };

  const handleSearch = text => {
    setSearchQuery(text);
    const results = fabData.filter(doc =>
      doc.question.toLowerCase().includes(text.toLowerCase()),
    );
    setSearchResults(results);
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Questions</Text>
        <TouchableRipple
          onPress={() => {
            navigation.navigate('FavoriteFaqScreen' , {userFavorites});
          }}>
          <View style={styles.subtitle}>
            <Text style={styles.subtitleText}>Favorites</Text>
            <Icon name="heart" color="#DB6D2D" size={25} />
          </View>
        </TouchableRipple>
      </View>

      <View style={[styles.searchContainer, {width: windowWidth * 0.9}]}>
        <Searchbar
          theme={{colors: {primary: 'green'}}}
          placeholder="Search"
          onChangeText={handleSearch}
          value={searchQuery}
          iconColor="#DB6D2D"
          borderColor="#0063A9"
          style={{backgroundColor: '#f5f5f5'}}
          onIconPress={() => handleSearch(searchQuery)}
          inputStyle={{color: '#0063A9', fontSize: 16}}
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
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
    justifyContent: 'center',
    width: '100%',
  },

  searchInput: {
    flex: 1,
    height: 50,
    borderColor: '#0063A9',
    borderWidth: 3,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: 'white',
    fontSize: 16,
  },

  searchIcon: {
    padding: 10,
    height: 50,
    marginTop: 10,
    paddingHorizontal: 10,
  },

  searchButton: {
    backgroundColor: '#0063A9',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 15,
    height: 40,
  },

  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 15,
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

  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: 'white',
  },
  documentText: {
    fontWeight: 'bold',
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 6,
    color: '#0063A9',
  },
  icon: {
    fontWeight: 'bold',
    marginBottom: 5,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: 8,
  },

  sectionContainer: {
    marginLeft: 15,
  },
  sectionText: {
    marginBottom: 5,
  },
  subtitle: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderBlockColor: '#DB6D2D',
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
