import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default function SignInScreen({navigation}) {
  const [count, setCount] = useState(0);
  const [showLogin, setShowLogin] = useState(false);

  const handlePressTrue = () => {
    setShowLogin(true);
  };
  const handlePressFalse = () => {
    setShowLogin(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.buttonBox}>
        <TouchableOpacity
          onPress={handlePressTrue}
          style={{margin: 24, color: showLogin ? 'grey' : 'black'}}>
          <Text>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handlePressFalse}
          style={{margin: 24, color: showLogin ? 'black' : 'grey'}}>
          <Text>Signup</Text>
        </TouchableOpacity>
      </View>

      {showLogin ? (
        // content of login
        <View>
          <Text>LoginScreen</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            style={styles.button}>
            <Text style={styles.buttonLabel}>SignIn</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // content of signup
        <View>
          <Text>SignUpScreen</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            style={styles.button}>
            <Text style={styles.buttonLabel}>SignUpScreen</Text>
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
    padding: 24,
  },
  buttonBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
