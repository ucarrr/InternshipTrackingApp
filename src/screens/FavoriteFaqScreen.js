//Favorite Question Screen
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ExpandableList from '../components/ExpandableList';
import axios from 'axios';
import {URLs, databases} from '../services/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Appbar} from 'react-native-paper';

const windowWidth = Dimensions.get('window').width;
const widthContent = windowWidth * 0.9;
const widthFav = windowWidth * 0.2;

export default function FavoriteFaqScreen({navigation, route}) {
  const {userFavorites} = route.params;

  const [favoritesData, setDataFavorites] = useState([]);

  useEffect(() => {
    fetchData();
  }, [userFavorites]);

  const fetchData = async () => {
    try {
      const url = URLs.BASE_URL + databases.FAQ;
      const response = await axios.get(url);
      const favoriteFaqs = response.data.filter(faq => userFavorites.includes(faq._id));
      setDataFavorites(favoriteFaqs);
      return favoriteFaqs;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title="Detail" />
      </Appbar.Header>
      <View style={styles.innerContainer}>
        <ExpandableList data={favoritesData} userFavorites={userFavorites} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
