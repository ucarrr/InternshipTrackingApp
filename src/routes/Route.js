import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import HomeScreen from '../screens/HomeScreen';

import SignInScreen from '../screens/SignInScreen';
import Profile from '../screens/Profile';
import StepDetailScreen from '../screens/StepDetailScreen';
import SplashScreen from '../screens/SplashScreen';
import CalenderScreen from '../screens/CalenderScreen';
import Calender from '../components/Calender';
import QuestionsScreen from '../screens/QuestionsScreen';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import 'react-native-gesture-handler';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function Route({ navigation }) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="SignIn" component={SignInScreen} />

        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="CalenderScreen" component={CalenderScreen} />
        <Stack.Screen name="Calender" component={Calender} />
        <Stack.Screen name="StepDetailScreen" component={StepDetailScreen} />
        <Stack.Screen name="QuestionsScreen" component={QuestionsScreen} />
        <Stack.Screen
          options={{ headerShown: false }}
          name="HomeScreen"
          component={HomeScreen}
        />
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={MyTabs}
        />
        {/*  <Stack.Screen
          options={{headerShown: false}}
          name="SignInScreen"
          component={TopTabfunc}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={({ route }) => ({
        tabBarLabelStyle: {
          fontSize: 17, // Yazı boyutu 
        },
        tabBarIcon: ({ focused, size, color }) => {
          let iconName;
          if (route.name === 'HomeScreen') {
            // <FontAwesome5 name={'home'} size={10} color="black" />;
            iconName = 'home';
            color = focused ? '#334EFF' : '#EEEEEE';
            size = 25;
          } else if (route.name === 'Calender') {
            iconName = 'calendar';
            size = 25;
            color = focused ? '#334EFF' : '#EEEEEE';
          } else if (route.name === 'Profile') {
            iconName = 'account';
            size = 25;
            color = focused ? '#334EFF' : '#EEEEEE';
          }
          else if (route.name === 'QuestionsScreen') {
            iconName = 'chat-question';
            size = 25;
            color = focused ? '#334EFF' : '#EEEEEE';
          }
          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
      })}

    >
      <Tab.Screen
        options={{ headerShown: false }}
        name="HomeScreen"
        component={HomeScreen}

      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Calender"
        component={CalenderScreen}

      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Profile"
        component={Profile}

      />

      <Tab.Screen
        options={{ headerShown: false }}
        name="QuestionsScreen"
        component={QuestionsScreen}

      />
    </Tab.Navigator>
  );
}

/* const TopTab = createMaterialTopTabNavigator();

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
} */
const styles = StyleSheet.create({});
