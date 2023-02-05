import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  Image,
  Dimensions,
  StyleSheet,
 
 
 

} from 'react-native';

import React from 'react';


const LoginScreen = () => {
  return (
    //Container Start
    <ScrollView
      style={{flex: 1, backgroundColor: 'ffffff'}}
      showsVerticalScrollIndicator={false}>
      {/* Brand View */}
      <ImageBackground
        source={require('../Assets/texture_surface_dark.jpg')}
        style={{
          height: Dimensions.get('window').height / 2.5,
        }}>
        <View style={styles.brandView}>
          <Image source={require('../Assets/logo.png')}></Image>
          <Text style={styles.brandViewText}>InternShip</Text>
        </View>
      </ImageBackground>

      {/* Bottom View */}
      <View style={styles.bottomView}>
        {/* Welcome View */}

        <View style={{padding: 40}}>
          <Text style={{color: '#4632A1', fontSize: 34}}>Welcome</Text>
          <Text>
            Don't have an account?
            <Text style={{color: 'red', fontStyle: 'italic'}}>
              {' '}
              Register now
            </Text>
          </Text>
          {/* Form Input View */}
          <View style={{marginTop:50}}>
            
            
           
          

          </View>

        </View>
      </View>
    </ScrollView>
    //Container end
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  brandView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandViewText: {
    color: '#ffffff',
    fontSize: 35,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  bottomView: {
    flex: 1.5,
    backgroundColor: '#ffffff',
    bottom: 50,
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
  },
});
