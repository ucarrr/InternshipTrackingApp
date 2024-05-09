import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {Checkbox, TextInput} from 'react-native-paper';
import axios from 'axios';
import {URLs, databases} from '../services/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignInScreen({navigation}) {
  const [showLogin, setShowLogin] = useState(true);
  const [emailTextLogin, setemailTextLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');
  const [checked, setChecked] = useState(false);
  const [emailTextRegister, setEmailTextRegister] = useState('');
  const [passwordRegister, setPasswordRegister] = useState('');

  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [eyeIcon, setEyeIcon] = useState('eye');

  useEffect(() => {
    //handleRegister();
    //loginUser();
  }, []);

  const handleRegister = async () => {
    const userData = {
      email: emailTextRegister,
      password: passwordRegister,
    };
    console.log('Gönderilen veriler:', userData);

    try {
      const url = URLs.BASE_URL + databases.REGISTER;
      console.log('url veriler:', url);
      const response = await axios.post(
        URLs.BASE_URL + databases.REGISTER,
        userData,
      ); // API'den verileri çekiyoruz.
      console.log('Register response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };

  const loginUser = async (email, password) => {
    const url = URLs.BASE_URL + databases.LOGIN;
    console.log('url veriler:', url);
    try {
      const response = await axios.post(url, {
        email,
        password,
      });
      console.log('Login response:', response.data); // Giriş yanıtını konsola yazdır

      const userData = response.data;
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      navigation.navigate('Home')
      return response.data; // Sunucudan gelen veriyi döndür
    } catch (error) {
      console.error('Error logging in:', error);

    // Hata mesajını oluşturma
    let errorMessage = "Giriş yaparken bilinmeyen bir hata meydana geldi. Lütfen tekrar deneyin.";
    if (error.response && error.response.data) {
      if (typeof error.response.data === 'string') {
        errorMessage = error.response.data;
      } else if (error.response.data.message) {
        errorMessage = error.response.data.message;
      }
    } else if (error.message) {
      errorMessage = error.message;
    }

    // Alert ile hata mesajını göster
    Alert.alert(
      "Giriş Hatası",  // Uyarı başlığı
      errorMessage,  // Uyarı mesajı
      [
        { text: "Tamam", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );

    // Hata döndür veya başka bir işlem yap
    return error; // Eğer bir değer döndürmek istemiyorsanız
    }
  };

  const handlePressTrue = () => {
    setShowLogin(true);
  };
  const handlePressFalse = () => {
    setShowLogin(false);
  };
  const handlePasswordVisibility = () => {
    if (eyeIcon === 'eye') {
      setEyeIcon('eye-outline');
      setPasswordVisibility(!passwordVisibility);
    } else if (eyeIcon === 'eye-outline') {
      setEyeIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  /*   function handleEmail(text) {
    const regex = /^[a-zA-Z0-9._%+-]+@ogr\.akdeniz\.edu\.tr$/;
    setemailTextLogin(text);
    if (regex.test(text)) {
      setEmailVerify(false);
    } else {
      setEmailVerify(true);
    }
  } */

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>InternShip App</Text>

      <View style={styles.buttonBox}>
        <TouchableOpacity
          onPress={handlePressTrue}
          style={[styles.buttonLogin, showLogin && styles.selectedButton]}>
          <Text>SIGN IN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handlePressFalse}
          style={[styles.buttonLogin, !showLogin && styles.selectedButton]}>
          <Text>SIGN UP</Text>
        </TouchableOpacity>
      </View>

      {showLogin ? (
        // content of login
        <View style={styles.container2}>
          <TextInput
            style={styles.input}
            contentStyle={{color: '#0063A9'}}
            outlineColor="#0063A9"
            activeOutlineColor="#0063A9"
            mode="outlined"
            label="Email"
            onChangeText={text => setemailTextLogin(text)}
            right={<TextInput.Icon icon="account" color="#0063A9" />}
          />
          <TextInput
            style={styles.input}
            contentStyle={{color: '#0063A9'}}
            outlineColor="#0063A9"
            activeOutlineColor="#0063A9"
            mode="outlined"
            label="Password"
            secureTextEntry={passwordVisibility}
            onChangeText={text => setPasswordLogin(text)}
            right={
              <TextInput.Icon
                icon={eyeIcon}
                color="#0063A9"
                onPress={handlePasswordVisibility}
              />
            }
          />
          <View style={styles.checkboxContainer}>
            <Checkbox
              color="#0063A9"
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked(!checked);
              }}
            />
            <Text style={styles.checkboxText}>Beni Hatırla</Text>
          </View>

          <TouchableOpacity
            onPress={() => loginUser(emailTextLogin, passwordLogin)}
            style={styles.button}>
            <Text style={styles.buttonTextFont}>SignIn</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.forgotPasswordButton}
            onPress={() => navigation.navigate('Home')}>
            <Text style={styles.forgotPasswordText}>Şifremi Unuttum?</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // content of signup
        // content of login
        <View style={styles.container2}>
          <TextInput
            style={styles.input}
            contentStyle={{color: '#0063A9'}}
            outlineColor="#0063A9"
            activeOutlineColor="#0063A9"
            mode="outlined"
            label="Email"
            onChangeText={text => setEmailTextRegister(text)}
            right={<TextInput.Icon icon="account" color="#0063A9" />}
          />
          <TextInput
            style={styles.input}
            contentStyle={{color: '#0063A9'}}
            outlineColor="#0063A9"
            activeOutlineColor="#0063A9"
            mode="outlined"
            label="Password"
            secureTextEntry={passwordVisibility}
            onChangeText={text => setPasswordRegister(text)}
            right={
              <TextInput.Icon
                icon={eyeIcon}
                color="#0063A9"
                onPress={handlePasswordVisibility}
              />
            }
          />
          <TextInput
            style={styles.input}
            contentStyle={{color: '#0063A9'}}
            outlineColor="#0063A9"
            activeOutlineColor="#0063A9"
            mode="outlined"
            label="Password"
            secureTextEntry={passwordVisibility}
            onChangeText={setPassword}
            right={
              <TextInput.Icon
                icon={eyeIcon}
                color="#0063A9"
                onPress={handlePasswordVisibility}
              />
            }
          />

          <TouchableOpacity onPress={handleRegister} style={styles.button}>
            <Text style={styles.buttonTextFont}>SignUp</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#fff',
  },
  buttonBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '40%',
  },
  logo: {
    width: '50%',
    height: 100,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  buttonLogin: {
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent', // Başlangıçta button alt kenar çizgisini gizlendi
  },
  selectedButton: {
    borderBottomColor: 'blue', // Seçilen button alt kenar çizgisi mavi olacak
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B366A',
    marginBottom: 20,
  },
  container2: {
    marginHorizontal: 'auto',
    marginTop: 10,
    width: '80%',
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    margin: 12,
    marginHorizontal: 'auto',
  },
  button: {
    width: '100%',
    margin: 12,
    backgroundColor: '#0063A9',
    justifyContent: 'center',
    marginTop: 10,
    alignItems: 'center',
    padding: 10,
    borderRadius: 50,
    height: 50,
    marginHorizontal: 'auto',
  },
  buttonTextFont: {
    fontSize: 24,
    color: '#fff',
  },
  checkboxContainer: {
    marginHorizontal: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    marginLeft: 30,
  },
  checkboxText: {
    marginLeft: 12,
  },
  forgotPasswordButton: {
    marginHorizontal: 'auto',
    alignItems: 'center',
    marginTop: 10,
  },
  forgotPasswordText: {
    fontSize: 16,
    color: '#0063A9',
  },
});
