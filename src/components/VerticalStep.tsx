import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Dimensions } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { URLs } from '../services/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const widthContent = windowWidth * 0.7;
const widthContent2 = windowWidth * 0.5;
const width = windowWidth * 1.0;

const indicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 1,
  currentStepStrokeWidth: 5,
  stepStrokeCurrentColor: '#0063A9',
  stepStrokeWidth: 3,
  separatorStrokeFinishedWidth: 4,
  stepStrokeFinishedColor: '#0063A9',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#0063A9',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#0063A9',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 20,
  currentStepIndicatorLabelFontSize: 50,
  stepIndicatorLabelCurrentColor: '#0063A9',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 18,
  currentStepLabelColor: '#0063A9',
};

const getStepIndicatorIconConfig = ({ position, stepStatus }) => {
  const iconConfig = {
    name: 'check',
    color: stepStatus === 'finished' ? '#ffffff' : '#0063A9',
    size: 15,
  };

  return <MaterialIcons name={iconConfig.name} color={iconConfig.color} size={iconConfig.size} />;
};

export default function VerticalStep() {
  const [currentPage, setCurrentPage] = useState(0);
  const navigation = useNavigation();
  const [stepData, setStepData] = useState([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataString = await AsyncStorage.getItem('userDataResponse');
        if (!userDataString) {
          console.log('No user data found');
          setLoading(false);
          return;
        }
        const userData = JSON.parse(userDataString);
        const userUrl = `${URLs.BASE_URL}users/${userData._id}`;
        const userSteps = await axios.get(userUrl);
        const steps = userSteps.data.steps.map(step => ({
          ...step,
          stepDetails: step.stepDetails.map(detail => ({
            ...detail,
            isCompleted: detail.isCompleted === true 
          }))
        }));
        console.log('Fetched steps:', steps);
        setStepData(steps);
        // Progress in step data to calculate the current step
        // Step Detail is complete
        const currentStepIndex = steps.findIndex(
          (step) => !step.stepDetails.every((detail) => detail.isCompleted)
        );
        setCurrentPage(currentStepIndex === -1 ? steps.length - 1 : currentStepIndex);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  const goToDetails = (position, stepDetails, stepId) => {
    navigation.navigate('StepDetailScreen', { stepIndex: position, stepDetails, stepId });
  };

  const getStepStatus = (index) => {
    if (index < currentPage) {
      return 'finished';
    }
    if (index === currentPage) {
      return 'current';
    }
    return 'unfinished';
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container2}>
        <ActivityIndicator size="large" color="#0063A9" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container2}>
      <Text style={styles.headerText}>ÇİZELGE</Text>
      <View style={styles.container}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <View style={styles.stepIndicator}>
            {stepData.length > 0 ? (
              <StepIndicator
                customStyles={indicatorStyles}
                stepCount={stepData.length}
                direction="vertical"
                currentPosition={currentPage}
                renderStepIndicator={getStepIndicatorIconConfig}
                labels={stepData.map((item, index) => (
                  <View key={index} style={styles.content}>
                    <View style={styles.content2}>
                      <Text style={styles.labelIndex}>Adım {index + 1}</Text>
                      <TouchableHighlight
                        activeOpacity={0.6}
                        underlayColor="'rgb(210, 230, 255)' : 'white',"
                        onPress={() => goToDetails(index, item.stepDetails, item._id)}
                        style={[styles.labelContainer]}>
                        <Text style={styles.label}>{item.title}</Text>
                      </TouchableHighlight>
                    </View>
                    <Pressable onPress={() => goToDetails(index, item.stepDetails, item._id)}>
                      <MaterialCommunityIcons
                        name={'chevron-right'}
                        size={20}
                        color={'blue'}
                      />
                    </Pressable>
                  </View>
                ))}
              />
            ) : (
              <Text>No steps found</Text>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderTopLeftRadius: 320,
    borderBottomEndRadius: 320,
    borderColor: '#ccc',
    backgroundColor: 'white',
  },
  stepIndicator: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    margin: 5,
    padding: 10,
    width: widthContent,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    height: 85,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#0098fe',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content2: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    width: widthContent2,
  },
  labelContainer: {
    width: '80%',
    marginBottom: 10,
    padding: 1,
    borderRadius: 5,
  },
  labelIndex: {
    textAlign: 'center',
    color: '#DB6D2D',
    fontSize: 15,
    fontWeight: '700',
  },
  label: {
    textAlign: 'left',
    color: '#007ad1',
    fontSize: 16,
    fontWeight: '500',
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#DB6D2D',
    marginRight: '10%',
    marginTop: '5%',
    marginHorizontal: 130,
    alignSelf: 'flex-end',
  },
});
