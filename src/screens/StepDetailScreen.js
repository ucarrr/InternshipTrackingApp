import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { Appbar } from 'react-native-paper';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import axios from 'axios';
import { URLs } from '../services/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;

export default function StepDetailScreen({ navigation, route }) {
  const { stepIndex, stepId } = route.params;
  const [stepDetails, setStepDetails] = useState([]);
  const [checked, setChecked] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStepDetails = async () => {
      try {
        const userDataString = await AsyncStorage.getItem('userDataResponse');
        const userData = userDataString ? JSON.parse(userDataString) : null;

        const userUrl = `${URLs.BASE_URL}users/${userData._id}/steps/${stepId}`;
        const response = await axios.get(userUrl);
        const step = response.data;
        const details = step.stepDetails.map(detail => ({
          ...detail,
          isCompleted: detail.isCompleted === true  
        }));
        setStepDetails(details);
        setChecked(details.map(detail => detail.isCompleted));
      } catch (error) {
        console.error('Error fetching step details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStepDetails();
  }, [stepId]);

  const handleCheck = async (index, isChecked) => {
    const updatedChecked = [...checked];
    updatedChecked[index] = isChecked;
    setChecked(updatedChecked);

    try {
      const userDataString = await AsyncStorage.getItem('userDataResponse');
      const userData = userDataString ? JSON.parse(userDataString) : null;
      const stepDetailId = stepDetails[index]._id; 
      const userUrl = `${URLs.BASE_URL}users/${userData._id}/steps/${stepId}/stepDetails/${stepDetailId}`;
      const response = await axios.put(userUrl, { isCompleted: isChecked });
      console.log("Step Detail Response: ", JSON.stringify(response.data, null, 2));
      console.log(`Updated step detail ${index + 1} to ${isChecked}`);

      // Eğer tüm step detayları tamamlandıysa, currentPage'i artır
      if (updatedChecked.every((item) => item)) {
        //navigation.goBack();
      }
    } catch (error) {
      console.error('Error updating step detail:', error);
    }
  };

  const Item = ({ title, index }) => (
    <View style={styles.item}>
      <BouncyCheckbox
        size={25}
        fillColor="#0063A9"
        unfillColor="#FFFFFF"
        text={title}
        isChecked={checked[index]}
        iconStyle={{ borderColor: '#0063A9' }}
        innerIconStyle={{ borderWidth: 3 }}
        textStyle={{ fontFamily: 'JosefinSans-Regular', fontSize: 20 }}
        onPress={(isChecked) => handleCheck(index, isChecked)}
      />
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0063A9" />
      </SafeAreaView>
    );
  }

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Detay" />
      </Appbar.Header>
      <SafeAreaView style={styles.container}>
        <FlatList
          style={styles.listStyle}
          data={stepDetails}
          keyExtractor={item => item._id}
          renderItem={({ item, index }) => (
            <Item title={item.title} index={index} />
          )}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  listStyle: {
    flex: 1,
    backgroundColor: '#ffffff',
    width: windowWidth,
  },
  item: {
    backgroundColor: '#fff',
    borderRadius: 20,
    borderColor: '#0063A9',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 25,
    color: '#0063A9',
  },
  checkbox: {},
});
