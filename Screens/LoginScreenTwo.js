import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  Image,
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

const WINDOW_WIDTH = Dimensions.get('window').width;

const LoginScreenTwo = () => {
  return (
    //Container Start

    <View style={styles.container}>
      <View style={styles.headerView}>
        <Image source={require('../Assets/logo.png')}></Image>
        <Text style={styles.headerViewText}>InternShip</Text>
      </View>
      <ScrollView style={styles.formSection}>
        <View style={styles.inputView}>
          <Text style={styles.signInText2}>Sign In</Text>
          <TextInput
            style={{fontSize: 25, borderColor: '#4632A1'}}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType={'go'}
          />
          <TextInput
            style={{fontSize: 25, borderColor: '#4632A1'}}
            placeholder="Password"
            secureTextEntry={true}
          />

          <TouchableOpacity onPress={() => navigation.navigate('')}>
            <Text style={styles.forgatPasswordText}>I forgat password</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.bottomView}>
        <View style={styles.signUpArea}>
          <Text style={styles.signUpDecription}>Don't have a account!</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signUpText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreenTwo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerView: {
    flex: 0.75,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#1672DF',
  },
  headerViewText: {
    color: '#FFFFFF',
    fontSize: 35,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  bottomView: {
    flex: 1.25,
    backgroundColor: '#F4FCFF',
  },
  formSection: {
    top: 200,
    position: 'absolute',
    zIndex: 1,
    position: 'absolute',
    alignSelf: 'center',

    backgroundColor: '#FFFFFF',
  },
  inputView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height / 1.75,
    width: Dimensions.get('window').width / 1.25,
  },
  signInText2: {
    marginVertical: 10,
    fontSize: 20,
    color: '#333',
  },
});
