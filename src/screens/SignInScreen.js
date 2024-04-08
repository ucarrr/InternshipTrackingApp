import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, Alert} from 'react-native';
import {Checkbox, TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

export default function SignInScreen({navigation}) {
  const [showLogin, setShowLogin] = useState(true);
  const [emailText, setEmailText] = useState('');
  const [emailVerify,setEmailVerify]=useState(false);
  const [password, setPassword] = useState('');
  const [passwordVerify,setpasswordVerify]=useState(false);
  const [checked, setChecked] = useState(false);
  const [confirmPassword, setConfirmPassword]=useState('');

  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [eyeIcon, setEyeIcon] = useState('eye');


  function handleSignUp(){
    const userData={
      email:emailText,
      password:password,
    };
    if(emailVerify){
      axios.post("http://192.168.1.108:5001/register",userData)
    .then(res=> {
      console.log(res.data);
      if(res.data.status == 'ok'){
        Alert.alert('Kayıt başarılı!');
      }
      else{
        Alert.alert(JSON.stringify(res.data));
      }
    })
    .catch(e=> console.log(e));
    }
    else{
      Alert.alert("Doğru bir şekilde doldurun")
    }
  
  }


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

  function handleEmail(text){
    const regex=/^[a-zA-Z0-9._%+-]+@ogr\.akdeniz\.edu\.tr$/;
    setEmailText(text);
    if(regex.test(text)){
      setEmailVerify(false);
    }
    else{
      setEmailVerify(true)
    }
  }

  function handlePassword(){
    if(password==confirmPassword){
      setpasswordVerify(false);
    }
    else{
      console.log(text);
       setpasswordVerify(true);
    }
  }


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
            
            onChangeText={text=>handleEmail(text)}
            right={<TextInput.Icon icon="account" color="#0063A9"/>}
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
            right={<TextInput.Icon icon={eyeIcon} color="#0063A9" onPress={handlePasswordVisibility}/>}
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
            onPress={() => {
              {
                emailVerify
                  ? alert('Email format is wrong')
                  : navigation.navigate('Home')
              }
            }}
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
            
            onChangeText={text=>handleEmail(text)}
            right={<TextInput.Icon icon="account" color="#0063A9"/>}
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
            right={<TextInput.Icon icon={eyeIcon} color="#0063A9" onPress={handlePasswordVisibility}/>}
          />
          <TextInput
            style={styles.input}
            contentStyle={{color: '#0063A9'}}
            outlineColor="#0063A9"
            activeOutlineColor="#0063A9"
            mode="outlined"
            label="Password"
            secureTextEntry={passwordVisibility}
            
            onChangeText={setConfirmPassword}
            right={<TextInput.Icon icon={eyeIcon} color="#0063A9" onPress={handlePasswordVisibility}/>}
          />

          <TouchableOpacity style={styles.button} onPress={() => handleSignUp()}>
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
    color: '#0063A9'
  },
});
