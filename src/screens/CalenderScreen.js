import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Calender from '../components/Calender';

export default function CalenderScreen() {
  return (
 
      
      <Calender />
 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
