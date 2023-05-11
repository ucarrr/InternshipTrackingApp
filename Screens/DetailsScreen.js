import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  Dimensions,
  TouchableOpacity,
  Button,
} from 'react-native';
import StepIndicator from 'react-native-step-indicator';

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
  separatorStrokeWidth: 2,//2
  currentStepStrokeWidth: 3, //3
  stepStrokeCurrentColor: 'blue',
  stepStrokeWidth: 2, //3
  stepStrokeFinishedColor: '#4AB0F4',
  stepStrokeUnFinishedColor: '#aaaaaa', //aaaaa
  separatorFinishedColor: '#4AB0F4',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#4AB0F4',//mavi
  stepIndicatorUnFinishedColor: 'grey',
  stepIndicatorCurrentColor: 'white',
  stepIndicatorLabelFontSize: 17,
  currentStepIndicatorLabelFontSize: 20,
  stepIndicatorLabelCurrentColor: 'blue',
  stepIndicatorLabelFinishedColor: 'grey',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 40,
  currentStepLabelColor: 'blue',
};

function DetailsScreen() {
  const [currentPosition, setCurrentPosition] = useState(0);

  const nextStep = () => {
    setCurrentPosition(currentPosition+1);
    if (currentPosition === 4) {
      return alert("Your internship is finished !!!");
    }
  }

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

      <View style={styles.indicatorContainer}>


        <TouchableOpacity style={styles.nextBtn} onPress={()=> alert("yüklenecek")}>
          <Text style={styles.text}>Questions</Text>
        </TouchableOpacity>

        <StepIndicator
          customStyles={customStyles}
          currentPosition={currentPosition}
          labels={labels}
          direction="vertical"
          renderLabel={({position, stepStaus, label, crntPosition}) => {
            return (
              <View style={styles.lblContainer}>
                <Text style={styles.lblText}>{data[position].label}</Text>
                <Text style={[styles.status, {marginTop: 5}]}>
                  {data[position].status}
                </Text>
                <Text style={styles.status}>{data[position].dateTime}</Text>
              </View>
            );
          }}
        />
        <TouchableOpacity style={styles.nextBtn} onPress={()=> nextStep()}>
          <Text style={styles.text}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey', //1e1e1e
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
    color: 'blue', //ff3232
    fontSize: 22,
    fontWeight: 'bold',
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
  lblContainer: {
    marginTop: 40,
    padding: 10,
    paddingLeft: 15,
    width: width - 100,
  },
  lblText: {
    fontSize: 19,
    color: 'black', // black
    fontWeight: 'bold',
  },
  status: {
    fontSize: 18,
    color: 'gray',
    
  },
  nextBtn:{
    alignSelf:'flex-end',
    color:'grey',
  },
  text:{
    color:'#4AB0F4',
    fontSize:18,
  },
});



/*
colors code 
1E6392 = petrol mavisi
*/ 