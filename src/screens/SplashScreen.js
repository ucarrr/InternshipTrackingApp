import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
 
export default function SplashScreen({navigation}) {

  useEffect(() => {
    const clearUserData = async () => {
      try {
        await AsyncStorage.removeItem('userDataResponse');
        console.log('Specific key has been removed from Async Storage.');
      } catch (error) {
        console.error('Failed to remove specific key from Async Storage:', error);
      }
    };
    clearUserData();
  }, []);


  setTimeout(() => {
    navigation.navigate('SignIn');
  }, 3000);
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/Akdeniz_Universitesi.png')}
        style={styles.tinyLogo}
      />

      <Text style={styles.text}>Staj Rehberi</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  box: {
    width: 'auto',
  },
  tinyLogo: {
    width: '50%',
    height: '30%',
    paddingBottom: 20,
    resizeMode: 'contain',
  },
  text: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    color: '#DB6D2D',
  },
});
