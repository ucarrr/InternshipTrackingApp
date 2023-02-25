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

const WINDOW_WIDTH = Dimensions.get('window').width;

const LoginScreenTwo = () => {
  return (
    //Container Start
    <ScrollView style={{flex: 1, backgroundColor: '#ffffff'}}>
      <View style={styles.headerView}>
        <Image source={require('../Assets/logo.png')}></Image>
        <Text style={styles.headerViewText}>InternShip</Text>
      </View>
      <View style={styles.bottomView}>

      </View>
    </ScrollView>
  );
};

export default LoginScreenTwo;

const styles = StyleSheet.create({
  headerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
    backgroundColor: '#2a4efc',
  },
  headerViewText: {
    color: '#071764',
    fontSize: 35,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  bottomView:{
    flex: 1,
    backgroundColor: 'red',
   
  },
});
