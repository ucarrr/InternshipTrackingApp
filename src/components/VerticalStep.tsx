import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, TouchableHighlight} from 'react-native';
import StepIndicator from 'react-native-step-indicator'; 
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const labels = ["Staj için uygun işyeri bulunur","Zorunlu staj formu öğrenci tarafından doldurulur","Staja başlanır","Staj raporu","Turnitin orijinallik raporu alınır","Teslim"];

const indicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 3,
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
  currentStepIndicatorLabelFontSize: 20, // Şu anki adım göstergesi etiketinin font boyutu
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

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const onStepPress = (position: number) => {
    setCurrentPage(position);
    
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
            <TouchableHighlight
              key={index}
              onPress={() => handleLabelPress(index)}
              underlayColor="#dddddd"
              style={[styles.labelContainer, hovered && styles.hoveredLabelContainer]}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}>
              <Text style={styles.label}>{label}</Text>
            </TouchableHighlight>
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
    marginHorizontal:'auto',
    marginVertical: 50,
     
  },
  labelContainer: {
    marginBottom: 10,
    textAlign: 'center',
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 5,
  },
  hoveredLabelContainer: {
    backgroundColor: '#dddddd',
  },
  label: {
    color: '#0063A9',
     
  },
});
