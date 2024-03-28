import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
} from 'react-native';

import {Appbar} from 'react-native-paper';
import {Checkbox} from 'react-native-paper';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const windowWidth = Dimensions.get('window').width;

const generateData = (count) => {
  const data = [];
  for (let i = 1; i <= count; i++) {
    data.push({ id: `${i}`, title: `Item ${i}` });
  }
  return data;
};
const DATA = generateData(10); 


export default function StepDetailScreen({navigation}) {
  //const [checked, setChecked] = useState({});

  const [checked, setChecked] = useState(Array(DATA.length).fill(false));

  const handleCheck = (index, boolean) => {
    console.log(`ITEM ${index + 1} pressed Status ${boolean}`);
    /*  const updatedChecked = [...checked]; // checked array'inin bir kopyasını oluşturun
    updatedChecked[index] = !updatedChecked[index]; // İlgili öğenin durumunu tersine çevirin
    setChecked(updatedChecked); // Güncellenmiş durumu ayarlayın */
  };
  const [value, setValue] = React.useState('first');
  const Item = ({title, index}) => (
    <View style={styles.item}>
      {/* <Text style={styles.title}>{title}</Text> */}
      {/*   <Checkbox.Item
        label={title}
        labelStyle={styles.title}
        color="#0063A9"
        status={checked[index] ? 'checked' : 'unchecked'}
        onPress={() => {
          handleCheck(index);
          //setChecked(!checked);
        }}
        uncheckedColor="#0063A9"
        style={styles.checkbox}
      />
 */}
      <BouncyCheckbox
        size={25}
        fillColor="#0063A9"
        unfillColor="#FFFFFF"
        text={title}
        iconStyle={{borderColor: '#0063A9'}}
        innerIconStyle={{borderWidth: 3}}
        textStyle={{fontFamily: 'JosefinSans-Regular', fontSize: 20}}
        onPress={(checked: boolean) => {
          handleCheck(index, checked);
        }}
      />
    </View>
  );

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title="Detail" />
      </Appbar.Header>
      <SafeAreaView style={styles.container}>
        <FlatList
          style={styles.listStyle}
          data={DATA}
          renderItem={({item, index}) => (
            <Item title={item.title} index={index} />
          )}
          keyExtractor={item => item.id}
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
