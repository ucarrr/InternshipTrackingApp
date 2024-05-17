import React,{useState, useEffect} from 'react'
import { StyleSheet, Text, View,Dimensions } from 'react-native' 
import { SafeAreaView } from 'react-native-safe-area-context'
import ExpandableList from '../components/ExpandableList'
import axios from 'axios';
import {URLs, databases} from '../services/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Appbar} from 'react-native-paper';


const windowWidth = Dimensions.get('window').width;
const widthContent = windowWidth * 0.9;
const widthFav = windowWidth * 0.2;


export default function FaqScreen({navigation, route}) {

  const [userFaq, setUserFaq] = useState();
  const [faq, setFaq] = useState();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  //const [documents, setDocuments] = useState(documentCollection);
  const [favoritesData, setDataFavorites] = useState([]);




  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const url = URLs.BASE_URL + databases.FAQ;
      const response = await axios.get(url);
      console.log('Data:', response.data);
      setDataFavorites(response.data);
      console.log('Faq Data:', favoritesData);
      return response.data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  };

/*   useEffect(() => {
    fetchUserProfile().then(data => {
      setUserFaq(data);
    }).catch(err => console.log(err));
  }, []);

  const fetchUserProfile = async () => {
    try {      
      
      const userDataString = await AsyncStorage.getItem('userDataResponse');   
      const userData = userDataString ? JSON.parse(userDataString) : null;  
      
      console.log('User Faq Question:', userData.userFavoriteFaqs);   
      return userData;
    
    } catch (error) {
      console.error('Error fetching user profile:', error);
      Alert.alert('Error', 'Failed to load user data');
      
    }
  }; */


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
      <ExpandableList data={searchQuery ? searchResults : favoritesData} /> 
    </View>
    </>
   
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
       
    },
    innerContainer: {
      padding:10,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 30,     
      justifyContent: 'center',
      alignSelf:'center',
       
    },
})