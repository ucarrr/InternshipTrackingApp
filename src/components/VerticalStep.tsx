import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const widthN = windowWidth * 0.7;
const width = windowWidth * 1.0;

const labels = [
  'Staj için uygun işyeri bulunur',
  'Zorunlu staj formu doldurulur',
  'Staja başlanır',
  'Staj raporu',
  'Turnitin orijinallik raporu alınır',
  'Teslim',
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
  switch (position) {
    case 0: {
      iconConfig.name = 'check';
      break;
    }
    case 1: {
      iconConfig.name = 'check';
      break;
    }
    case 2: {
      iconConfig.name = 'check';
      break;
    }
    case 3: {
      iconConfig.name = 'check';
      break;
    }
    case 4: {
      iconConfig.name = 'check';
      break;
    }
    default: {
      break;
    }
  }
  return iconConfig;
};

export default function VerticalStep() {
  const [currentPage, setCurrentPage] = useState(0);
  const [hovered, setHovered] = useState(false);

  const [isCompleted, setIsCompleted] = useState(false);

/*   const handleItemCompletion = () => {
    setIsCompleted(true);
  }; */

  const onStepPress = (position: number) => {
    setCurrentPage(position);
    setIsCompleted(true);
  };

  const renderStepIndicator = (params: any) => (
    <MaterialIcons {...getStepIndicatorIconConfig(params)} />
  );

  const handleLabelPress = (position: number) => {
    console.log(`Label ${position + 1} pressed`);
    // Burada label tıklandığında gerçekleştirilecek işlemler yer alacak
  };
  return (
    <View style={styles.container}>
      <View style={styles.stepIndicator}>
        <StepIndicator
          customStyles={indicatorStyles}
          stepCount={6}
          direction="vertical"
          currentPosition={currentPage}
          onPress={onStepPress}
          renderStepIndicator={renderStepIndicator}
          labels={labels.map((label, index) => (
            <View style={styles.content}>
              <Text style={styles.labelIndex}>Step {index + 1}</Text>
              <TouchableHighlight
                activeOpacity={0.6}
                underlayColor="'rgb(210, 230, 255)' : 'white',"
                key={index}
                onPress={() => handleLabelPress(index)}
                style={[styles.labelContainer]}>
                <Text style={styles.label}>{label}</Text>
              </TouchableHighlight>
              {isCompleted ? (
                <Text>Öğe tamamlandı</Text>
              ) : (
                <Text>Öğe devam ediyor</Text>
              )}
            </View>
          ))}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepIndicator: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    margin: 5,
    padding: 10,
    width: widthN,
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 100,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#0098fe',
  },
  labelContainer: {
    width: '80%',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  labelIndex: {
    textAlign: 'left',
    color: 'black',
  },
  label: {
    textAlign: 'left',
    color: '#0063A9',
    fontSize: 17,
    fontWeight: '500',
  },
});
