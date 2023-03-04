import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';

var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;

const SignUp = ({navigation}) => {
  return (
    <ScrollView
      style={{flex: 1, backgroundColor: '#ffffff'}}
      showsVerticalScrollIndicator={false}>
      {/* Brand View */}
      <ImageBackground
        source={require('../Assets/texture_surface_dark.jpg')}
        style={{
          height: Dimensions.get('window').height / 2.5,
        }}>
        <View style={styles.brandView}>
          <Image
            source={require('../Assets/logo.png')}
            style={{
              width: screenWidth / 3.5,
              height: screenHeight / 5.5,
            }}></Image>
          <Text style={styles.brandViewText}>InternShip</Text>
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

export default SignUp;

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
  formSection: {
    flex: 1,
    marginTop: 30,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  emailSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  passwordSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    marginTop: 20,
  },
  checkmarkIcon: {
    padding: 10,
  },
  forgotSection: {
    height: 60,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: -20,
  },
  button: {
    height: 40,
    borderRadius: 50,
    backgroundColor: '#4632A1',
    textAlign: 'center',
    alignSelf: 'center',
    width: Dimensions.get('window').width / 2,
    justifyContent: 'center',
  },
  buttonLabel: {
    textAlign: 'center',

    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },

});
