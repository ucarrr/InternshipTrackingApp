import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  Image,
  Dimensions,
  StyleSheet,
  TextInput,
} from 'react-native';

import React, {useState} from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import {ListItem} from 'react-native-ui-lib';
import {CheckBox} from '@rneui/base';

const LoginScreen = () => {
  const [isSelected, setSelection] = useState(false);

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
            <View style={{flex: 1, marginLeft: -20}}>
              <View>
                <CheckBox value={isSelected} style={styles.checkbox} />
              </View>
            </View>
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
    marginTop: 50,
    flexDirection: 'column',
    justifyContent: 'space-around',
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
    height: 50,
    marginTop: 20,
    flexDirection: 'row',
  },
});
