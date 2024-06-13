import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  Dimensions,
} from 'react-native';
import {Appbar} from 'react-native-paper';
import axios from 'axios';
import {URLs} from '../services/index';

const windowWidth = Dimensions.get('window').width;

export default function ForgotPasswordScreen({navigation}) {
  const [email, setEmail] = useState('');

  const emailValidator = email => {
    // E-posta formatını kontrol etmek için regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // E-posta boşsa hata mesajı döndür
    if (!email) {
      return 'E-posta adresi boş bırakılamaz.';
    }

    // E-posta formatı geçersizse hata mesajı döndür
    if (!emailRegex.test(email)) {
      return 'Geçersiz e-posta adresi.';
    }

    // E-posta geçerliyse boş string döndür
    return '';
  };

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert('Hata', 'Lütfen e-posta adresinizi girin.');
      return;
    }

    const emailError = emailValidator(email);
    if (emailError) {
      Alert.alert(
        'Hata',
        emailError,
        [{text: 'Tamam', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
      return;
    }

    try {
      const response = await axios.post(
        `${URLs.BASE_URL}auth/forgot-password`,
        {email},
      );
      Alert.alert(
        'Başarılı',
        'E-postanıza şifre sıfırlama bağlantısı gönderildi.',
      );
    } catch (error) {
      console.error('Error sending password reset link:', error);
      Alert.alert('Hata', 'Şifre sıfırlama bağlantısı gönderilemedi.');
    }
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Şifreyi Sıfırla" />
      </Appbar.Header>
      <View style={styles.container}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.title}>Şifreyi Unuttum</Text>
        <TextInput
          style={styles.input}
          placeholder="Email Adresini Giriniz"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TouchableOpacity onPress={handleForgotPassword} style={styles.button}>
          <Text style={styles.buttonText}>Şifreyi Sıfırla</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  logo: {
    width: '50%',
    height: 100,
    marginBottom: 20,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#0063A9',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});
