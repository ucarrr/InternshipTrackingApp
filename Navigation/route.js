import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import LoginScreen from '../Screens/LoginScreen';
import DetailsScreen from '../Screens/DetailsScreen';
import HomeScreen from '../Screens/HomeScreen';
import SplashScreen from '../Screens/SplashScreen';
import SignUp from '../Screens/SignUp';
import Profile from '../Screens/Profile';
 

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createNativeStackNavigator();
const size= 25;
const color= 'red';


function route() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LogIn" headerMode="none">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      
        <Stack.Screen
          name="LogIn"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen
          options={{headerShown: false}}
          name="HomeScreen"
          component={MyBottomTabs}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Tab = createBottomTabNavigator();

function MyBottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarActiveTintColor: '#3366ff',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
        screenOptions={{
          tabBarActiveTintColor: '#e91e63',
        }}
      />
      <Tab.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'DetailsScreen',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="security" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default route;
