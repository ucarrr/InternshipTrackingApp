import { StyleSheet, Text, View,StatusBar } from 'react-native'
import React from 'react'
import {Title, Avatar, Caption, TouchableRipple} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';


const Profile = () => {
  const navigation = useNavigation();
  return (
   <SafeAreaView style={styles.container}>
    <StatusBar backgroundColor="#000" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Profile Page</Text>
      </View>
    <View style={styles.userInfoSection}>
      <View style={{flexDirection:'row', marginTop:15}}>
        <Avatar.Image
        source={{
          uri:'https://play-lh.googleusercontent.com/i1qvljmS0nE43vtDhNKeGYtNlujcFxq72WAsyD2htUHOac57Z9Oiew0FrpGKlEehOvo=w240-h480-rw',
        }}
        size={80}
        />
        <View style={{marginLeft:20}}>
          <Title style={[styles.title,{
          marginTop:8,
          marginBottom:5,
          }]}>Ece Bayramer</Title>
          <Caption style={styles.caption}>@ece_ba</Caption>
        </View>
      </View>
    </View>

    <View style={styles.userInfoSection}>
      <View style={styles.row}>
        <Icon name="map-marker-radius" color='#1B374E' size={22}/>
        <Text style={{color:'#4F5458', marginLeft:20, fontSize:17}}>Türkiye, Antalya</Text>
      </View>

      <View style={styles.row}>
        <Icon name="phone" color='#1B374E' size={22}/>
        <Text style={{color:'#4F5458', marginLeft:20, fontSize:17}}>+90 555 555 55 55</Text>
      </View>

      <View style={styles.row}>
        <Icon name="email" color='#1B374E' size={22}/>
        <Text style={{color:'#4F5458', marginLeft:20, fontSize:17}}>ece@gmail.com</Text>
      </View>
    </View>

    <View style={styles.infoBoxWrapper}>

      <View style={[styles.infoBox, {
        borderRightColor:'#5198C9',
        borderRightWidth:1
      }]}>
        <Title style={styles.title2}>4</Title>
        <Caption style={styles.caption2}> Class </Caption>
      </View>

      <View style={styles.infoBox}>
        <Title style={styles.title2}>%12</Title>
        <Caption style={styles.caption2}>Internship state</Caption>
      </View>
    </View>

    <View style={styles.menuWrapper}>
      <TouchableRipple onPress={() => {}}>
        <View style={styles.menuItem}>
          <Icon name='heart' color='#5198C9' size={25}/>
          <Text style={styles.menuItemText}>Your Favorite Questions</Text>
        </View>
      </TouchableRipple>
      <TouchableRipple onPress={() => {}}>
        <View style={styles.menuItem}>
          <Icon1 name='user' color='#5198C9' size={25}/>
          <Text style={styles.menuItemText}>Personal Information</Text>
        </View>
      </TouchableRipple>
      <TouchableRipple onPress={() => {}}>
        <View style={styles.menuItem}>
          <Icon1 name='setting' color='#5198C9' size={25}/>
          <Text style={styles.menuItemText}>Settings</Text>
        </View>
      </TouchableRipple>
      <TouchableRipple onPress={() => {}}>
        <View style={styles.menuItem}>
          <Icon1 name='message1' color='#5198C9' size={25}/>
          <Text style={styles.menuItemText}>Message</Text>
        </View>
      </TouchableRipple>
      <TouchableRipple onPress={() => navigation.navigate("LogIn")}>
        <View style={styles.menuItem}>
          <Icon1 name='logout' color='#5198C9' size={25}/>
          <Text style={styles.menuItemText}>Logout</Text>
        </View>
      </TouchableRipple>
    </View>

   </SafeAreaView>
  );
};

export default Profile

const styles = StyleSheet.create({
  container:{
    flex:1,
  },

  userInfoSection: {
    paddingHorizontal:30,
    marginBottom:25,
  },

  title:{
    fontSize:25,
    fontWeight:'bold',
    color:'#1B374E',    
  },

  caption:{
    fontSize:17,
    lineHeight:17,
    fontWeight: '500',
  },

  title2:{
    fontSize:22,
    fontWeight:'bold',
    color:'#1B374E',
  },

  caption2:{
    fontSize:15,
    lineHeight:15,
    fontWeight:'500',
  },

  row: {
    flexDirection:'row',
    marginBottom:10,
  },

  infoBoxWrapper:{
    borderBottomColor:'#dddddd',
    borderBottomWidth:1,
    borderTopColor:'#dddddd',
    borderTopWidth:1,
    flexDirection:'row',
    height:100,
  },

  infoBox:{
    width:'50%',
    alignItems:'center',
    justifyContent:'center',
  },

  menuWrapper:{
    marginTop:10,
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
  header: {
    height: 55,
    padding: 10,
    width: '100%',
    backgroundColor: 'white', //000
    elevation: 10,
    justifyContent:'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#5198C9', //ff3232
    fontSize: 22,
    fontWeight: 'bold',
  },
});