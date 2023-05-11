import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import TwoColumnTimeLine from '../components/TwoColumnTimeLine';

const HomeScreen = () => {
  const [val, setVal] = useState(1);

  const renderElement = () => {
    
    if (val === 1) {
      return <TwoColumnTimeLine />;
    } 
  };

  const tabName = [
    'Two Column TimeLine',
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View>
          <ScrollView horizontal>
            <View style={{flexDirection: 'row'}}>
              
            </View>
          </ScrollView>
        </View>
        {/*View to hold the child screens 
        which can be changed on the click of a button*/}
        <View style={styles.childContainer}>
          {renderElement()}
        </View>
      </View>
    </SafeAreaView>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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
});
