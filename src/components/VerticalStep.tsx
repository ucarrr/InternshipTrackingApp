import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Pressable,
  ScrollView,
} from 'react-native';

import StepIndicator from 'react-native-step-indicator';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Dimensions} from 'react-native';
import CompletedButton from './CompletedButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {SafeAreaView} from 'react-native-safe-area-context';
import axios from 'axios';
import {URLs, databases} from '../services/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const widthContent = windowWidth * 0.7;
const widthContent2 = windowWidth * 0.5;
const width = windowWidth * 1.0;

const labels = [
  'Staj için uygun işyeri bulunur',
  'Zorunlu staj formu doldurulur',
  'Staja başlanır',
  'Staj raporu',
  'Turnitin orijinallik raporu alınır',
  'Teslim',
];

const labels2 = [
  {text: 'Staj için uygun işyeri bulunur', completed: false, uncompleted: true},
  {text: 'Zorunlu staj formu doldurulur', completed: false, uncompleted: true},
  {text: 'Staja başlanır', completed: false, uncompleted: true},
  {text: 'Staj raporu', completed: false, uncompleted: true},
  {
    text: 'Turnitin orijinallik raporu alınır',
    completed: false,
    uncompleted: true,
  },
  {text: 'Teslim', completed: false},
];

const indicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 1,
  currentStepStrokeWidth: 5,
  stepStrokeCurrentColor: '#0063A9', // Şu anki adımın çizgi rengi
  stepStrokeWidth: 3,
  separatorStrokeFinishedWidth: 4,
  stepStrokeFinishedColor: '#0063A9', // Tamamlanmış adımların çizgi rengi
  stepStrokeUnFinishedColor: '#aaaaaa', // Tamamlanmamış adımların çizgi rengi
  separatorFinishedColor: '#0063A9', // Tamamlanmış adımlar arasındaki ayırıcı çizgi rengi
  separatorUnFinishedColor: '#aaaaaa', // Tamamlanmamış adımlar arasındaki ayırıcı çizgi rengi
  stepIndicatorFinishedColor: '#0063A9', // Tamamlanmış adım göstergesinin rengi
  stepIndicatorUnFinishedColor: '#ffffff', // Tamamlanmamış adım göstergesinin rengi
  stepIndicatorCurrentColor: '#ffffff', // Şu anki adım göstergesinin rengi
  stepIndicatorLabelFontSize: 20, // Adım göstergesi etiketlerinin font boyutu
  currentStepIndicatorLabelFontSize: 50, // Şu anki adım göstergesi etiketinin font boyutu
  stepIndicatorLabelCurrentColor: '#0063A9', // Şu anki adım göstergesi etiketinin rengi
  stepIndicatorLabelFinishedColor: '#ffffff', // Tamamlanmış adım göstergesi etiketinin rengi
  stepIndicatorLabelUnFinishedColor: '#aaaaaa', // Tamamlanmamış adım göstergesi etiketinin rengi
  labelColor: '#999999', // Etiketlerin rengi
  labelSize: 18, // Etiketlerin font boyutu
  currentStepLabelColor: '#0063A9', // Şu anki adımın etiket rengi
};
const getStepIndicatorIconConfig = ({
  position,
  stepStatus,
}: {
  position: number;
  stepStatus: string;
}) => {
  const iconConfig = {
    name: 'check',
    color: stepStatus === 'finished' ? '#ffffff' : '#0063A9',
    size: 15,
  };

  iconConfig.name = 'check';

  return iconConfig;
};

export default function VerticalStep() {
  const [currentPage, setCurrentPage] = useState(0);
  const [hovered, setHovered] = useState(false);

  const [isCompleted, setIsCompleted] = useState(false);
  const [completedSteps, setCompletedSteps] = useState(
    Array(labels.length).fill(false),
  );

  const navigation = useNavigation();

  const [stepData, setStepData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {

     /*  const url = URLs.BASE_URL + databases.STEP;
      const response = await axios.get(url);
      console.log('Data:', response.data); */

      const userDataString = await AsyncStorage.getItem('userDataResponse');   
      const userData = userDataString ? JSON.parse(userDataString) : null;  
      
      console.log('User Profileee:', userData.steps);   
     
      setStepData(userData.steps);

      //console.log('Step Data:', stepData);
      return userData.steps;  
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error; // Hata yönetimi için hatayı fırlat
    }
  };

  /*   const handleItemCompletion = () => {
    setIsCompleted(true);
  }; */

  const onStepPress = (position: number) => {
    setCurrentPage(position);
    setIsCompleted(true);
    const updatedCompletedSteps = [...completedSteps]; // Mevcut durumun bir kopyasını oluşturun
    updatedCompletedSteps[position] = true; // Seçilen pozisyonu true olarak ayarlayın
    setCompletedSteps(updatedCompletedSteps); // Güncellenmiş durumu ayarlayın
  };

  const renderStepIndicator = (params: any) => (
    <MaterialIcons {...getStepIndicatorIconConfig(params)} />
  );

  const goToDetails = (position: number, stepDetails: any) => {
    navigation.navigate('StepDetailScreen', {stepIndex: position, stepDetails});
    console.log(`Label ${position + 1} pressed`);
    // Burada label tıklandığında gerçekleştirilecek işlemler yer alacak
  };
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
            <StepIndicator
              customStyles={indicatorStyles}
              stepCount={6}
              direction="vertical"
              currentPosition={currentPage}
              onPress={onStepPress}
              renderStepIndicator={renderStepIndicator}
              labels={stepData.map((item, index) => (
                <View style={styles.content}>
                  <View style={styles.content2}>
                    <Text style={styles.labelIndex}>Step {index + 1}</Text>
                    <TouchableHighlight
                      activeOpacity={0.6}
                      underlayColor="'rgb(210, 230, 255)' : 'white',"
                      key={index}
                      onPress={() => goToDetails(index, item.stepDetails)}
                      style={[styles.labelContainer]}>
                      <Text style={styles.label}>{item.title}</Text>
                    </TouchableHighlight>

                    {/*  {completedSteps.length > index && completedSteps[index] ? (
                <Text>Öğe tamamlandı</Text>
              ) : (
                <Text>Öğe devam ediyor</Text>
              )} */}
                    {/*  {currentPage === index ? (
                <Text>Öğe devam ediyor</Text>
              ) : currentPage > index ? (
                <Text>Öğe tamamlandı</Text>
              ) : null} */}
                  </View>
                  <Pressable  onPress={() => goToDetails(index, item.stepDetails)}>
                    <MaterialCommunityIcons
                      name={'chevron-right'}
                      size={20}
                      color={'blue'}
                    />
                  </Pressable>
                </View>
              ))}
            />
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
    color: '#007ad1', //0080db
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
