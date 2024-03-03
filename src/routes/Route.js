import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import HomeScreen from '../screens/HomeScreen';

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';

import Profile from '../screens/Profile';

import SplashScreen from '../screens/SplashScreen';

import 'react-native-gesture-handler';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function Route({navigation}) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{
            headerShown: false,
          }}>
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Home"
          component={MyTabs}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="SignInScreen"
          component={TopTabfunc}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarActiveTintColor: '#3366ff',
      }}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

const TopTab = createMaterialTopTabNavigator();

function TopTabfunc() {
  return (
    <TopTab.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        activeBackgroundColor: '#8BC540',
        inactiveBackgroundColor: '#349746',
        activeTintColor: '#F5F4F4', // tab text color
        inactiveTintColor: '#F5F4F4',
        tabStyle: {
          paddingTop: 10,
        },
        style: {
          height: 58,
        },
        labelPosition: 'below-icon',
        labelStyle: {
          marginTop: 5,
          marginBottom: 4,
        },
      }}>
      <TopTab.Screen
        name="SignIn"
        component={SignInScreen}
        options={{tabBarLabel: 'SignIn'}}
      />
      <TopTab.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{tabBarLabel: 'SignUp'}}
      />
    </TopTab.Navigator>
  );
}
const styles = StyleSheet.create({});
