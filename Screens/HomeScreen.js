import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import {Title, Avatar, Caption, TouchableRipple} from 'react-native-paper';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.containerTab}>
      <View style={styles.container}>
        <Text style={styles.title}>Hellu Home Screen</Text>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon1 name="questioncircle" color="#5198C9" size={25} />
            <Text style={styles.menuItemText}>Questions about internship</Text>
          </View>
        </TouchableRipple>

        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon1 name="rightcircle" color="#5198C9" size={25} />
            <Text style={styles.menuItemText}>Start internship</Text>
          </View>
        </TouchableRipple>

        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon2 name="document" color="#5198C9" size={25} />
            <Text style={styles.menuItemText}>Documents</Text>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  containerTab:{
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    marginTop:20,
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
  menuWrapper:{
    marginTop:50,
  },
  menuItem:{
    flexDirection:'row',
    paddingVertical:15,
    paddingHorizontal:30,
    
  },
  menuItemText:{
    color: '#777777',
    marginLeft:20,
    fontWeight:'600',
    fontSize:16,
    lineHeight:26
  },
});
