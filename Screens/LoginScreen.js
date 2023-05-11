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
  Pressable,
} from 'react-native';

import React, {useState, useEffect} from 'react';

import Icon from 'react-native-vector-icons/Ionicons';

import {CheckBox} from '@rneui/base';

var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;

const buttonPass = () => {};

const LoginScreen = ({navigation}) => {
  const [checked, setChecked] = useState(true);
  const toggleCheckbox = () => setChecked(!checked);
  const [password, setPassword] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [eyeIcon, setIcon] = useState('eye');

  const handlePasswordVisibility = () => {
    if (eyeIcon === 'eye') {
      setIcon('eye-off-sharp');
      setPasswordVisibility(!passwordVisibility);
    } else if (eyeIcon === 'eye-off-sharp') {
      setIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  return (
    //Container Start
    <ScrollView
      style={{flex: 1, backgroundColor: '#ffffff'}}
      showsVerticalScrollIndicator={false}>
      {/* Brand View */}
      <ImageBackground
        source={require('../Assets/texture_surface_dark.jpg')}
        style={{
          flex: 1,
        }}>
        <View style={styles.brandView}>
          <Image
            source={require('../Assets/Akdeniz_Universitesi.png')}
            style={{
              height: (Dimensions.get('window').height * 100) / 400,
              width: (Dimensions.get('window').width * 100) / 200,
              flex: 2,
              marginTop: 5,
            }}></Image>
          <Text style={styles.brandViewText}>InternShip</Text>
        </View>

        {/* Bottom View */}
        <View style={styles.bottomView}>
          {/* Welcome View */}
          <View style={{padding: 40, flex: 1}}>
            <Text style={{color: '#000080', fontSize: 35}}>Welcome</Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                flex: 1,
              }}>
              <Text style={{fontSize: 18, flex: 1}}>
                Don't have an account?
              </Text>

              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={{color: 'red', fontStyle: 'italic', fontSize: 18}}>
                  Register now
                </Text>
              </TouchableOpacity>
            </View>

            {/* Form TextInput View */}
            <View style={styles.formSection}>
              <View style={styles.emailSection}>
                <TextInput
                  style={styles.inputTextStyles}
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

              <View style={styles.emailSection}>
                <TextInput
                  style={styles.inputTextStyles}
                  placeholder="Password"
                  secureTextEntry={passwordVisibility}
                />
                <Pressable onPress={handlePasswordVisibility}>
                  <Icon
                    name={eyeIcon}
                    style={styles.checkmarkIcon}
                    size={30}
                    color="#4632A1"
                  />
                </Pressable>
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
                flex: 1,
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('HomeScreen')}
                style={styles.button}>
                <Text style={styles.buttonLabel}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
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

    flex: 1,
  },
  bottomView: {
    flex: 3,
    backgroundColor: '#ffffff',
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
    marginTop: 20,
  },
  formSection: {
    flex: 3,
    marginTop: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'space-around',
  },
  emailSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },

  checkmarkIcon: {
    padding: 10,
    color:'#000080'
  },
  forgotSection: {
    height: 60,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -20,
    flex: 1,
  },
  button: {
    height: 40,
    borderRadius: 50,
    backgroundColor: '#000080',
    textAlign: 'center',
    alignSelf: 'center',
    width: Dimensions.get('window').width / 1.5,
    justifyContent: 'center',
  },
  buttonLabel: {
    textAlign: 'center',

    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
  inputTextStyles: {
    color: '#4632A1',
    fontSize: 25,
    borderColor: '#4632A1',
    borderBottomColor: '#4632A1',
    borderBottomWidth: 1,
    flex: 1,
  },
});
