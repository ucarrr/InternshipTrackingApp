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

import React, {useState} from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import {ListItem} from 'react-native-ui-lib';
import {CheckBox} from '@rneui/base';

const buttonPass = () => {}

const LoginScreen = () => {
  const [checked, setChecked] = useState(true);
  const toggleCheckbox = () => setChecked(!checked);

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
          <Text style={{color: '#4632A1', fontSize: 35}}>Welcome</Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              fontSize: 18,
            }}>
            <Text>Don't have an account?</Text>

            <TouchableOpacity onPress={buttonPass}>
              <Text style={{color: 'red', fontStyle: 'italic'}}>
                Register now
              </Text>
            </TouchableOpacity>
          </View>

          {/* Form TextInput View */}
          <View style={styles.formSection}>
            <View style={styles.emailSection}>
              <TextInput
                style={{fontSize: 25, borderColor: '#4632A1'}}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType={'go'}
              />
              <Icon
                name="checkmark"
                style={styles.checkmarkIcon}
                size={30}
                color="#4632A1"
              />
            </View>

            <View style={styles.passwordSection}>
              <TextInput
                style={{fontSize: 25, borderColor: '#4632A1'}}
                placeholder="Password"
                secureTextEntry={true}
              />

              <Icon
                name="eye"
                style={styles.checkmarkIcon}
                size={30}
                color="#4632A1"
              />
            </View>
          </View>

          {/* Forgot Password &  Rebember Me View */}
          <View style={styles.forgotSection}>
            <CheckBox
              size={24}
              checked={checked}
              onPress={toggleCheckbox}
              iconType="material-community"
              checkedIcon="checkbox-marked"
              uncheckedIcon="checkbox-blank-outline"
              checkedColor="blue"
              title="Remember Me"
            />

            <TouchableOpacity onPress={buttonPass}>
              <Text style={{color: '#8f9195', fontSize: 18}}>
                Forgot Password
              </Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <View
            style={{
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={buttonPass} style={styles.button}>
              <Text style={styles.buttonLabel}>LogIn</Text>
            </TouchableOpacity>
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
  formSection: {
    flex: 1,
    marginTop: 50,
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
