import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default function CompletedButton() {
  const [showProgress, setShowProgress] = useState(true);

  const handlePress = () => {
    setShowProgress(!showProgress);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handlePress}
        style={[
          styles.button,
          {backgroundColor: showProgress ? '#ffffff' : '#0063A9'},
        ]}>
        <Text
          style={[
            styles.buttonText,
            {color: showProgress ? '#0063A9' : '#ffffff'},
          ]}>
          {showProgress ? 'Öğe devam ediyor' : 'Öğe tamamlandı'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
 
  }, 
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
