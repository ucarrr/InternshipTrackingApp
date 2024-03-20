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

const DATA = [
  {id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba', title: 'First Item'},
  {id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63', title: 'Second Item'},
  {id: '58694a0f-3da1-471f-bd96-145571e29d72', title: 'Third Item'},
  {id: '891297a4-7528-4d75-9435-2636b5a8394b', title: 'Fourth Item'},
  {id: '1b22d9ec-8c81-4d69-83e9-fda5d173a9cd', title: 'Fifth Item'},
  {id: 'fc301ae5-b352-4e2d-8f1b-fd9fc7cc7a89', title: 'Sixth Item'},
  {id: '2b732d68-590f-4f53-a9f6-83e98b82f8ab', title: 'Seventh Item'},
  {id: 'eb8c747d-b7b0-4df1-865f-3e584bfa3a5f', title: 'Eighth Item'},
  {id: '47b1da4e-1b07-4a41-9de1-875cf3e599c1', title: 'Ninth Item'},
  {id: '06e2b919-c1c0-4a6e-b5dc-4e03a4cf7a2d', title: 'Tenth Item'},
];

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
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#0063A9',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 25,
    color: '#0063A9',
  },
  checkbox: {},
});
