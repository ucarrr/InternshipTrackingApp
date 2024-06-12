import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Alert, Linking, ScrollView, Dimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TouchableRipple} from 'react-native-paper';
import Icon1 from 'react-native-vector-icons/AntDesign';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import {URLs} from '../services/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Profile({navigation}) {
  const [userInfo, setUserInfo] = useState(null);
  const [progress, setProgress] = useState(0);
  const [links, setLinks] = useState([]);
  const [completedSteps, setCompletedSteps] = useState(0);
  const [remainingSteps, setRemainingSteps] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      fetchUserProfile();
      fetchLinks();
    }, []),
  );

  useEffect(() => {
    if (userInfo) {
      console.log('userInfo', JSON.stringify(userInfo, null, 2));
      calculateSteps(userInfo.steps);
      setProgress(userInfo.progress);
    }
  }, [userInfo]);

  const fetchUserProfile = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userDataResponse');
      const userData = JSON.parse(userDataString);
      const userUrl = `${URLs.BASE_URL}users/${userData._id}`;
      const userResponse = await axios.get(userUrl);
      const user = userResponse.data;

      console.log('Fetched user data:', JSON.stringify(user, null, 2));
      setUserInfo(user);
      return user;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      Alert.alert('Error', 'Failed to load user data');
    }
  };

  const fetchLinks = async () => {
    try {
      console.log(`${URLs.BASE_URL}link`);
      const linksResponse = await axios.get(`${URLs.BASE_URL}link`);

      console.log('linksResponse', JSON.stringify(linksResponse.data, null, 2));
      setLinks(linksResponse.data);
    } catch (error) {
      console.error('Error fetching links:', error);
      Alert.alert('Error', 'Failed to load links');
    }
  };

  const calculateSteps = steps => {
    if (!steps) {
      console.log('Steps not defined');
      return;
    }

    let completed = 0;
    let remaining = 0;

    steps.forEach(step => {
      step.stepDetails.forEach(detail => {
        if (detail.isCompleted) {
          completed += 1;
        } else {
          remaining += 1;
        }
      });
    });

    setCompletedSteps(completed);
    setRemainingSteps(remaining);
    console.log(`Completed steps: ${completed}, Remaining steps: ${remaining}`);
  };

  useEffect(() => {
    console.log('Links state:', links);
  }, [links]);

  if (!userInfo) {
    return <Text style={styles.loading}>Loading...</Text>;
  }

  const logout = async () => {
    await AsyncStorage.clear();
    await navigation.navigate('SignIn');
  };

  const openLink = url => {
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profile}>
          <Text style={styles.profileText}>Profile</Text>
        </View>

        <View style={styles.containerCircular}>
          <AnimatedCircularProgress
            size={windowWidth * 0.45}
            width={windowWidth * 0.04}
            fill={progress}
            tintColor="#DB6D2D"
            backgroundColor="#f4f4f4"
            rotation={0}
            padding={10}
            lineCap="round">
            {() => (
              <Text style={styles.progressInnerText}>Progress: {progress}%</Text>
            )}
          </AnimatedCircularProgress>
        </View>

        <View style={styles.progressTexts}>
          <View style={styles.progressTextsBox}>
            <Text style={styles.progressTextsBoxTextNumber}>
              {completedSteps}
            </Text>
            <Text style={styles.progressTextsBoxTexttext}>Tamamlanan</Text>
          </View>
          <View style={styles.progressTextsBox}>
            <Text style={styles.progressTextsBoxTextNumber}>
              {remainingSteps}
            </Text>
            <Text style={styles.progressTextsBoxTexttext}>Kalan</Text>
          </View>
        </View>

        <View style={styles.menuWrapper}>
          {links.length > 0 ? (
            links
              .sort((a, b) => a.sequence - b.sequence)
              .map((item, index) => (
                <TouchableRipple
                  key={index}
                  onPress={() => openLink(item.link)}>
                  <View style={styles.menuItem}>
                    <Icon1 name="link" color="#0063A9" size={windowWidth * 0.06} />
                    <Text style={styles.menuItemText}>{item.text}</Text>
                  </View>
                </TouchableRipple>
              ))
          ) : (
            <Text style={styles.errorText}>Linkler backendten çekilemiyor</Text>
          )}
          <TouchableRipple onPress={logout}>
            <View style={[styles.menuItem, styles.logout]}>
              <Icon1 name="logout" color="#0063A9" size={windowWidth * 0.06} />
              <Text style={styles.menuItemText}>Çıkış</Text>
            </View>
          </TouchableRipple>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    paddingBottom: 30,
  },
  profile: {
    marginTop: 10,
    marginLeft: '10%',
  },
  profileText: {
    fontSize: windowWidth * 0.08,
    fontWeight: 'bold',
    color: '#0063A9',
  },
  containerCircular: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  progressTexts: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
 
  progressTextsBox: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    width:'40%',
    
  },
  progressTextsBoxTextNumber: {
    fontSize: windowWidth * 0.05,
    fontWeight: 'normal',
    color: '#0063A9',
  },
  progressTextsBoxTexttext:{
    fontSize: windowWidth * 0.03,
    fontWeight: 'bold',
    color: '#A7A7A7',
  },
  menuWrapper: {
    flex: 1,
    width: '100%',
  },
  menuItem: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  progressInnerText: {
    color: '#0063A9',
    fontWeight: '600',
    fontSize: windowWidth * 0.04,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: windowWidth * 0.04,
    lineHeight: windowHeight * 0.04,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 20,
    fontSize: windowWidth * 0.04,
  },
  logout: {
    borderTopWidth: 2,
    borderColor: '#ddd',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#777777',
    fontWeight: '600',
    fontSize: windowWidth * 0.04,
  },
});
