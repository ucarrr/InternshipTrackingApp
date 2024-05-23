import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ExpandableList from '../components/ExpandableList';
import axios from 'axios';
import { URLs, databases } from '../services/index';
import { Appbar } from 'react-native-paper';

const windowWidth = Dimensions.get('window').width;

export default function FavoriteFaqScreen({ navigation, route }) {
  const { userId } = route.params;
  const [userFavorites, setUserFavorites] = useState([]);
  const [faqData, setFaqData] = useState([]);
  const [favoriteFaqs, setFavoriteFaqs] = useState([]);

  useEffect(() => {
    fetchData();
   
  }, []);

  useEffect(() => {
    if (userFavorites.length > 0 && faqData.length > 0) {
      const filteredFaqs = faqData.filter(faq => userFavorites.includes(faq._id));
      setFavoriteFaqs(filteredFaqs);
      
    }
  }, [userFavorites, faqData]);

  const fetchData = async () => {
    try {
      const faqUrl = URLs.BASE_URL + databases.FAQ;
      const faqResponse = await axios.get(faqUrl);
      console.log('FAQs:', faqResponse.data);
      setFaqData(faqResponse.data);

      const userUrl = `${URLs.BASE_URL}users/${userId}`;
      console.log("User URL:", userUrl);
      const userResponse = await axios.get(userUrl);
      console.log("User Data:", userResponse.data);
      setUserFavorites(userResponse.data.userFavoriteFaqs);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Favorite FAQs" />
      </Appbar.Header>
      <SafeAreaView style={styles.container}>
        <View style={styles.innerContainer}>
          <ExpandableList data={favoriteFaqs} userFavorites={userFavorites}/>
        </View>
      </SafeAreaView>
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
  },
});
