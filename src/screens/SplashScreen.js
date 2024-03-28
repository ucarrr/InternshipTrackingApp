import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

export default function SplashScreen({navigation}) {
  setTimeout(() => {
    navigation.navigate('SignIn');
  }, 3000);
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/Akdeniz_Universitesi.png')}
        style={styles.tinyLogo}
      />

      <Text style={styles.text}>InternShip App</Text>
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
