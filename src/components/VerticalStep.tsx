import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Pressable,
  ScrollView,
} from 'react-native';
import { FAB, Portal, Provider as PaperProvider, AnimatedFAB  } from 'react-native-paper';
import StepIndicator from 'react-native-step-indicator';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Dimensions} from 'react-native';
import CompletedButton from './CompletedButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { SafeAreaView } from 'react-native-safe-area-context';


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

  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;

  const navigation = useNavigation();

  

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

  const handleLabelPress = (position: number) => {
    navigation.navigate('StepDetailScreen', {stepIndex: position});
    console.log(`Label ${position + 1} pressed`);
    // Burada label tıklandığında gerçekleştirilecek işlemler yer alacak
  };
  return (
    <SafeAreaView style={styles.container2}>
      <Text style={styles.headerText}>To Do List</Text>
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
            labels={labels2.map((item, index) => (
              <View style={styles.content}>
                <View style={styles.content2}>
                  <Text style={styles.labelIndex}>Step {index + 1}</Text>
                  <TouchableHighlight
                    activeOpacity={0.6}
                    underlayColor="'rgb(210, 230, 255)' : 'white',"
                    key={index}
                    onPress={() => handleLabelPress(index)}
                    style={[styles.labelContainer]}>
                    <Text style={styles.label}>{item.text}</Text>
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
                <Pressable onPress={() => handleLabelPress(index)}>
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
      
        <FAB.Group
          open={open}
          visible
          icon={open ? 'calendar-today' : 'plus'}
          color='#0063A9'
          actions={[
            { icon: 'plus', onPress: () => console.log('Pressed add'), color:'#0063A9', rippleColor:'#0063A9'},
            {
              icon: 'star',
              label: 'Star',
              color:'#0063A9',
              labelTextColor:'#DB6D2D',
              onPress: () => console.log('Pressed star'),
            },
            {
              icon: 'email',
              label: 'Email',
              color:'#0063A9',
              labelTextColor:'#DB6D2D',
              onPress: () => console.log('Pressed email'),
            },
            {
              icon: 'bell',
              color:'#0063A9',
              label: 'Remind',
              labelTextColor:'#DB6D2D',
              onPress: () => console.log('Pressed notifications'),
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      
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
  container2:{
    flex:1,
    alignItems:'flex-end',
    justifyContent:'flex-end',
    borderWidth:1,
    borderTopLeftRadius:320,
    borderBottomEndRadius:320,
    borderColor:'#ccc',
    backgroundColor:'white'
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
    textAlign:'center',
    color: '#DB6D2D',
    fontSize:15,
    fontWeight:'700',
    
  },
  label: {
    textAlign: 'left',
    color: '#007ad1',//0080db
    fontSize: 16,
    fontWeight: '500',
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color:'#DB6D2D',
    marginRight:13,
    marginTop:15
  },
});
