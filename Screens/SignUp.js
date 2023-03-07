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
import React, {useState, useEffect} from 'react';
import {ScrollView} from 'react-native-gesture-handler';

import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {Pressable} from '@react-native-material/core';

var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;

const SignUp = ({navigation}) => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [checkcircleoIcon, setcheckcircleoIcon] = useState('checkcircleo');
  const [eyeIcon, setIcon] = useState('eyeo');

  const handlePasswordVisibility = () => {
    if (eyeIcon === 'eyeo') {
      setIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    } else if (eyeIcon === 'eye') {
      setIcon('eyeo');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const handleCheckcirCleoVisibility = () => {
    if (checkcircleoIcon === 'checkcircleo') {
      setcheckcircleoIcon('checkcircle');
    } else if (checkcircleoIcon === 'checkcircle') {
      setcheckcircleoIcon('checkcircleo');
    }
  };

  return (
    <ScrollView
      style={{flex: 1, backgroundColor: '#ffffff'}}
      showsVerticalScrollIndicator={false}>
      <ImageBackground
        source={require('../Assets/texture_surface_dark.jpg')}
        style={{
          flex: 1,
        }}>
        <View style={styles.brandView}>
          <Image
            source={require('../Assets/Akdeniz_Universitesi.png')}
            style={{
              height: (Dimensions.get('window').height * 100) / 500,
              width: (Dimensions.get('window').width * 100) / 250,
              marginTop: 10,
              flex: 2,
            }}></Image>
          <Text style={styles.brandViewText}>Create your Account</Text>
        </View>

        <View style={styles.bottomView}>
          <View style={{padding: 40, flex: 1}}>
            <Text style={{color: '#4632A1', fontSize: 35}}>Welcome</Text>
            <View style={styles.formSection}>
              <View style={styles.emailSection}>
                <TextInput
                  style={styles.inputTextStyles}
                  placeholder={'Username'}
                  autoCapitalize={'none'}
                />

                <AntDesignIcon
                  name="user"
                  style={styles.iconsStyles}
                  size={30}
                  color="#4632A1"
                />
              </View>
              <View style={styles.emailSection}>
                <TextInput
                  style={styles.inputTextStyles}
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  returnKeyType={'go'}
                />
                <AntDesignIcon
                  name="check"
                  style={styles.iconsStyles}
                  size={30}
                  color="#4632A1"
                />
              </View>

              <View style={styles.emailSection}>
                <TextInput
                  style={styles.inputTextStyles}
                  placeholder={'Password'}
                  secureTextEntry={passwordVisibility}
                />
                <Pressable onPress={handlePasswordVisibility}>
                  <AntDesignIcon
                    name={eyeIcon}
                    style={styles.iconsStyles}
                    size={30}
                    color="#4632A1"
                  />
                </Pressable>
              </View>

              <View style={styles.emailSection}>
                <TextInput
                  style={styles.inputTextStyles}
                  placeholder={'Confirm Password'}
                  secureTextEntry
                />
                <Pressable onPress={handleCheckcirCleoVisibility}>
                  <AntDesignIcon
                    name={checkcircleoIcon}
                    style={styles.iconsStyles}
                    size={30}
                    color="#4632A1"
                  />
                </Pressable>
              </View>
            </View>

            <View
              style={{
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 15,
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('LogIn')}
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
                flex: 1,
              }}>
              <Text
                style={{color: '#4632A1', fontStyle: 'italic', fontSize: 18}}>
                Already have an account?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
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
    marginBottom: 20,
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    flex: 1,
  },
  signUpText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  bottomView: {
    flex: 2,
    backgroundColor: '#ffffff',

    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
  },
  emailSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  formSection: {
    marginTop: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'space-around',
    flex: 1,
  },
  iconsStyles: {
    padding: 10,
  },
  inputTextStyles: {
    color: '#4632A1',
    fontSize: 25,
    borderColor: '#4632A1',
    borderBottomColor: '#4632A1',
    borderBottomWidth: 1,
    flex: 1,
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
