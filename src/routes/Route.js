import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import SignInScreen from '../screens/SignInScreen';
import Profile from '../screens/Profile';
import StepDetailScreen from '../screens/StepDetailScreen';
import SplashScreen from '../screens/SplashScreen';
import CalenderScreen from '../screens/CalenderScreen';
import Calender from '../components/Calender';
import Questions from '../screens/QuestionsScreen';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import 'react-native-gesture-handler';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {AnimatedTabBarNavigator} from 'react-native-animated-nav-tab-bar';

const Stack = createNativeStackNavigator();

export default function Route({navigation}) {
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
        <Stack.Screen name="Questions" component={Questions} />
        <Stack.Screen
          options={{headerShown: false}}
          name="HomeScreen"
          component={HomeScreen}
        />
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen
          options={{headerShown: false}}
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

const Tabs = AnimatedTabBarNavigator();

function MyTabs() {
  return (
    <Tabs.Navigator
      initialRouteName="HomeScreen"
      tabBarOptions={{
        activeTintColor: '#FFFFFF',
        inactiveTintColor: '#AAAAAA',
        activeBackgroundColor: '#0087ff',
        tabStyle: {
          backgroundColor: '#FFFFFF',
          borderWidth: 1,
          borderColor: '#334EFF',
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          
          
        },
        
      }}
    
      appearance={{
        shadow: true,
        floating: false,
      }}
      labelStyle={{fontSize: 20,}}
      >
      <Tabs.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{           
          tabBarIcon: ({focused, color, size}) => (
            <MaterialCommunityIcons
              name="home"
              size={size ? size : 24}
              color={focused ? color : '#AAAAAA'}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Calender"
        component={CalenderScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <MaterialCommunityIcons
              name="calendar"
              size={size ? size : 24}
              color={focused ? color : '#AAAAAA'}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Questions"
        component={Questions}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <MaterialCommunityIcons
              name="text-box-search-outline"
              size={size ? size : 24}
              color={focused ? color : '#AAAAAA'}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <MaterialCommunityIcons
              name="account"
              size={size ? size : 24}
              color={focused ? color : '#AAAAAA'}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}

/*  const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={({route}) => ({
        tabBarLabelStyle: {
          fontSize: 17, // Yazı boyutu 
        },
        tabBarIcon: ({focused, size, color}) => {
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
          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
      })}
      
      >
      <Tab.Screen
        options={{headerShown: false}}
        name="HomeScreen"
        component={HomeScreen}
        
      />
      <Tab.Screen
        options={{headerShown: false}}
        name="Calender"
        component={CalenderScreen}
       
      />
      <Tab.Screen
        options={{headerShown: false}}
        name="Profile"
        component={Profile}
       
      />
    </Tab.Navigator>
  );
}
  */

const styles = StyleSheet.create({});
