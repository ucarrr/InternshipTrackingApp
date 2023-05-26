import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ImageBackground,
} from 'react-native';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import {Title, Avatar, Caption, TouchableRipple} from 'react-native-paper';
import CircularProgress from 'react-native-circular-progress-indicator';

const HomeScreen = () => {
  const image = {
    uri: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwallpaperaccess.com%2F916&psig=AOvVaw0XMb2RGjL8XdrIJU1lJOZM&ust=1685032676199000&source=images&cd=vfe&ved=2ahUKEwj80oiCso7_AhU4XvEDHcjyAtoQjRx6BAgAEAw',
  };
  const localImage = require('./../img/success.png');

  const [value, setValue] = useState(0);

  return (
    <SafeAreaView style={styles.containerTab}>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Home Page</Text>
      </View>
      <ImageBackground source={localImage} style={styles.containerTab}>
        <View style={styles.menuWrapper}>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon1 name="questioncircle" color="#1B374E" size={25} />
              <Text style={styles.menuItemText}>
                Questions about internship
              </Text>
            </View>
          </TouchableRipple>

          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon1 name="rightcircle" color="#1B374E" size={25} />
              <Text style={styles.menuItemText}>Start internship</Text>
            </View>
          </TouchableRipple>

          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon2 name="document" color="#1B374E" size={25} />
              <Text style={styles.menuItemText}>Documents</Text>
            </View>
          </TouchableRipple>
          <View style={styles.container2}>
          <CircularProgress
           radius={90}
           value={5}
           textColor=''
           fontSize={20}
           valueSuffix={'%'}
           inActiveStrokeColor={'white'}
           inActiveStrokeOpacity={0.2}
           progressValueColor={'#1B374E'}
           activeStrokeColor={'#1B374E'}
           
        />
          </View>
        </View>
       
      </ImageBackground>
    </SafeAreaView>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  containerTab: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    marginTop: 20,
  },
  container2: {
    alignItems: 'center',
    justifyContent:'center',
    marginTop: 55,
  },
  

  buttonStyle: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    margin: 2,
  },
  childContainer: {
    backgroundColor: '#f9f9f9',
    flex: 1,
    padding: 10,
  },

  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#5198C9',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  menuWrapper: {
    marginTop: 30,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: 'white',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 26,
  },
  header: {
    height: 55,
    padding: 10,
    width: '100%',
    backgroundColor: 'white', //000
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#5198C9', //ff3232
    fontSize: 25,
    fontWeight: 'bold',
  },
});
