import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
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
      <ImageBackground
        source={require('../Assets/texture_surface_dark.jpg')}
        style={{
          height: Dimensions.get('window').height / 1,
          width: Dimensions.get('window').width / 1,
        }}>
        <View style={styles.brandView}>
          <Image
            source={require('../Assets/logo.png')}
            style={{
              width: screenWidth / 3.5,
              height: screenHeight / 5.5,
            }}></Image>
          <Text style={styles.brandViewText}>Create your Account</Text>
        </View>

        <View style={styles.bottomView}>
          <View style={{padding: 40}}>
            <Text style={{color: '#4632A1', fontSize: 35}}>Welcome</Text>

            <View style={styles.emailSection}>
              <TextInput
                style={styles.input}
                placeholder={'Username'}
                autoCapitalize={'none'}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType={'go'}
              />
              <TextInput
                style={styles.input}
                placeholder={'Password'}
                secureTextEntry
              />
              <TextInput
                style={styles.input}
                placeholder={'Confirm Password'}
                secureTextEntry
              />
            </View>
            <View
              style={{
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('HomeScreen')}
                style={styles.button}>
                <Text style={styles.buttonLabel}>SignUp</Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'flex-start',
                marginTop: 10,
                flexDirection: 'row',
              }}>
              <Text
                style={{color: '#4632A1', fontStyle: 'italic', fontSize: 18}}>
                Already have an account?
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('LoginScreen')}>
                <Text style={{color: 'red', fontStyle: 'italic', fontSize: 18}}>
                  LogIn
                </Text>
              </TouchableOpacity>
            </View>
          </View>
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
    marginTop: 15,
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  signUpText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  bottomView: {
    flex: 2,
    backgroundColor: '#ffffff',
    bottom: 10,
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
  },
  emailSection: {
    marginTop: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'space-around',
  },
  input: {
    color: '#4632A1',
    fontSize: 25,
    borderColor: '#4632A1',
  },
  button: {
    height: 50,
    borderRadius: 50,
    backgroundColor: '#4632A1',
    textAlign: 'center',
    alignSelf: 'center',
    width: Dimensions.get('window').width / 1.2,
    justifyContent: 'center',
  },
  buttonLabel: {
    textAlign: 'center',

    fontSize: 30,
    fontWeight: '700',
    color: '#ffffff',
  },
  inputSignUp: {},
});
