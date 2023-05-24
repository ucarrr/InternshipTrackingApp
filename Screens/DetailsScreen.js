import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  Dimensions,
  TouchableOpacity,
  Button,
  Pressable,
  ImageBackground,
} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import Icon from 'react-native-vector-icons/AntDesign';

const {width, height} = Dimensions.get('window');
const labels = [
  'Preparation',
  'While starting',
  'During the internship',
  'While finishing',
  'Completed',
];
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 35,
  separatorStrokeWidth: 2, //2
  currentStepStrokeWidth: 3, //3
  stepStrokeCurrentColor: '#5198C9',
  stepStrokeWidth: 2, //3
  stepStrokeFinishedColor: '#4AB0F4',
  stepStrokeUnFinishedColor: '#aaaaaa', //aaaaa
  separatorFinishedColor: '#4AB0F4',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#4AB0F4', //mavi
  stepIndicatorUnFinishedColor: '#C7D2DB', //#8095A7
  stepIndicatorCurrentColor: 'white',
  stepIndicatorLabelFontSize: 17,
  currentStepIndicatorLabelFontSize: 20,
  stepIndicatorLabelCurrentColor: '#5198C9',
  stepIndicatorLabelFinishedColor: '#8095A7', //grey
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 40,
  currentStepLabelColor: '#5198C9',
};

function DetailsScreen({navigation}) {
  const [currentPosition, setCurrentPosition] = useState(0);

  const image = {
    uri: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwallpaperaccess.com%2F916&psig=AOvVaw0XMb2RGjL8XdrIJU1lJOZM&ust=1685032676199000&source=images&cd=vfe&ved=2ahUKEwj80oiCso7_AhU4XvEDHcjyAtoQjRx6BAgAEAw',
  };
  const localImage = require('./../img/success.png');

  const nextStep = () => {
    setCurrentPosition(currentPosition + 1);
    if (currentPosition === 4) {
      return alert('Your internship is finished !!!');
    }
  };

  const data = [
    {
      label: 'Preparation',
      status: 'What you need to do...',
      dateTime: 'Fri, 2rd June 11.49am',
    },
    {
      label: 'While starting',
      status: 'What you need to do...',
      dateTime: 'Wed, 7th June 12.30am',
    },
    {
      label: 'During the internship',
      status: 'What you need to do...',
      dateTime: 'Mon, 26th June 03.30pm',
    },
    {
      label: 'While finishing',
      status: 'What you need to do...',
      dateTime: 'Wed 12th July 05.30pm',
    },
    {
      label: 'Completed',
      status: 'What you need to do...',
      dateTime: 'Wed 19th July 05.30pm',
    },
  ];
  console.disableYellowBox = true;
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Internship Step</Text>
      </View>

      <ImageBackground source={localImage}>
        <View style={styles.indicatorContainer}>
          <TouchableOpacity
            style={styles.nextBtn}
            onPress={() => alert('yüklenecek')}>
            <Text style={styles.text}>Questions</Text>
          </TouchableOpacity>

          <StepIndicator
            customStyles={customStyles}
            currentPosition={currentPosition}
            labels={labels}
            direction="vertical"
            renderLabel={({position, stepStatus, label, crntPosition}) => {
              return (
                <View style={styles.lblContainer}>
                  <Pressable
                    onPress={() => navigation.navigate('TimelineScreen')}>
                    <Text style={styles.lblText}>{data[position].label}</Text>
                  </Pressable>
                  <Text style={[styles.status, {marginTop: 8}]}>
                    {data[position].status}
                  </Text>
                  <Text style={styles.status}>{data[position].dateTime}</Text>
                </View>
              );
            }}
          />
          <TouchableOpacity style={styles.nextBtn} onPress={() => nextStep()}>
            <Text style={styles.text}>Next</Text>
            <Icon name="check" color="#5198C9" size={28} paddingTop={12} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', //1e1e1e,#8095A7
  },
  header: {
    height: 55,
    padding: 10,
    width: '100%',
    backgroundColor: 'white', //000
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#5198C9', //ff3232
    fontSize: 22,
    fontWeight: 'bold',
  },
  indicatorContainer: {
    height: height - 110,
    width: width - 20,
    padding: 15,
    paddingTop: 0,
    margin: 10,
  },
  lblContainer: {
    marginTop: 18,
    padding: 10,
    paddingLeft: 15,
    width: width - 100,
  },
  lblText: {
    fontSize: 23,
    color: '#1B374E', // black
    fontWeight: 'bold',
  },
  //açıklama yazıları, küçük yazılar
  status: {
    fontSize: 18,
    color: 'white',
  },
  nextBtn: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    color: '#8095A7',
    flexDirection: 'row',
  },
  text: {
    color: '#5198C9',
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 10,
  },
});

/*
colors code 
1E6392 = petrol mavisi
*/
