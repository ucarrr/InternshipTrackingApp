import React, {useState, useEffect} from 'react';
import {View, StyleSheet, StatusBar, Text, TouchableOpacity,  Dimensions,} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const {width, height} = Dimensions.get('window');

const InternShipDetail = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Details about your state</Text>
        <Text style={styles.caption}>
          vdfsgerjkgbjksbvklsbekjlsdlfbkjbklds jfdbnjklbnljkbnldbnjklgd
          bdbbkjngfjbknfdbngkjnbkgbf
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('DetailsScreen')}
          style={styles.button}>
          <Text style={styles.buttonLabel}>Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default InternShipDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  container2: {
    flex: 1,
    backgroundColor: '#E9EAEA', //1e1e1e,#8095A7
  },
  
  indicatorContainer: {
    height: height - 130,
    width: width - 30,
    padding: 20,
    paddingTop: 0,
    margin: 15,
    elevation: 10,
    borderRadius: 20,
    backgroundColor: 'white',
  },

  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },

  title: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingTop:20,
  },

  caption: {
    fontSize: 17,
    lineHeight: 17,
    fontWeight: '500',
    paddingTop:10,
  },

  title2: {
    fontSize: 22,
    fontWeight: 'bold',
  },

  caption2: {
    fontSize: 15,
    lineHeight: 15,
    fontWeight: '500',
  },

  button: {
    height: 40,
    borderRadius: 50,
    backgroundColor: '#5198C9',
    textAlign: 'center',
    alignSelf: 'center',
    width: 100, //Dimensions.get('window').width / 1.5,
    justifyContent: 'center',
    marginTop:40,
  },

  buttonLabel: {
    textAlign: 'center',
    

    fontSize: 30,
    fontWeight: '700',
    color: '#ffffff',
  },

  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },

  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },

  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  menuWrapper: {
    marginTop: 10,
  },

  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },

  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});
