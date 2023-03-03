import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../Screens/LoginScreen';
import DetailsScreen from '../Screens/DetailsScreen';
import HomeScreen from '../Screens/HomeScreen';
import SplashScreen from '../Screens/SplashScreen';
 
 



const Stack = createNativeStackNavigator();

function route() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LogIn"   headerMode="none" >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="LogIn" component={LoginScreen} options={{headerShown:false}} />
        <Stack.Screen name="Splash" component={SplashScreen} />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default route