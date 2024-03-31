import React, {useState, useEffect} from 'react';
import {
  Alert,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Button,
  Pressable,
  Dimensions,
} from 'react-native';
import {Modal, Portal, Text, PaperProvider,IconButton} from 'react-native-paper';
import {
  Agenda,
  DateData,
  AgendaEntry,
  AgendaSchedule,
  LocaleConfig,
} from 'react-native-calendars';
import testIDs from './testIDs';

 

const windowWidth = Dimensions.get('window').width;
const widthContent = windowWidth * 0.8;

LocaleConfig.locales['tr'] = {
  monthNames: [
    'Ocak',
    'Şubat',
    'Mart',
    'Nisan',
    'Mayıs',
    'Haziran',
    'Temmuz',
    'Ağustos',
    'Eylül',
    'Ekim',
    'Kasım',
    'Aralık',
  ],
  monthNamesShort: [
    'Oca',
    'Şub',
    'Mar',
    'Nis',
    'May',
    'Haz',
    'Tem',
    'Ağu',
    'Eyl',
    'Eki',
    'Kas',
    'Ara',
  ],
  dayNames: [
    'Pazar',
    'Pazartesi',
    'Salı',
    'Çarşamba',
    'Perşembe',
    'Cuma',
    'Cumartesi',
  ],
  dayNamesShort: ['Paz', 'Pts', 'Sal', 'Çar', 'Per', 'Cum', 'Cts'],
  today: 'Bugün',
};
LocaleConfig.defaultLocale = 'tr';

const Calendar = () => {
  const [items, setItems] = useState<AgendaSchedule>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState('');

  const [text, setText] = useState('');

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  const toggleModal = () => {
    console.log(!modalVisible);
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    getCurrentDate();
    loadItems({timestamp: Date.now()});
  }, []);

  const addNewItem = () => {
    if (currentDate && text) {
      const newItems = {...items};
      if (!newItems[currentDate]) {
        newItems[currentDate] = [];
      }
      newItems[currentDate].push({
        name: text,
        height: Math.max(50, Math.floor(Math.random() * 150)),
        day: currentDate,
      });
      setItems(newItems);
      setText(''); // Metin girişini sıfırla
      hideModal(); // Modalı gizle
    } else {
      Alert.alert('Error', 'Please enter a valid text.');
    }
  };

  const onDayPress = day => {
    setCurrentDate(day.dateString);
  };


  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    // Ay ve gün tek haneli ise başlarına sıfır ekleyelim
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;

    const formattedDate = `${year}-${month}-${day}`;
    setCurrentDate(formattedDate);
  };

  const loadItems = (day: DateData) => {
    setTimeout(() => {
      const newItems: AgendaSchedule = {};
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);

        /* if (!newItems[strTime]) {
          newItems[strTime] = [];

          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            newItems[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
              day: strTime,
            });
          }
        } */
      }

      //  setItems(newItems);
    }, 1000);
  };

  const renderItem = (reservation: AgendaEntry, isFirst: boolean) => {
    const fontSize = isFirst ? 16 : 14;
    const color = isFirst ? 'black' : '#43515c';

    return (
      <TouchableOpacity
        testID={testIDs.agenda.ITEM}
        style={[styles.item, {height: reservation.height}]}
        onPress={() => Alert.alert(reservation.name)}>
        <Text style={{fontSize, color}}>{reservation.name}</Text>
      </TouchableOpacity>
    );
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  };

  const rowHasChanged = (r1: AgendaEntry, r2: AgendaEntry) => {
    return r1.name !== r2.name;
  };

  const timeToString = (time: number) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };

  return (
    <>
      <Agenda
        maxDate="2025-12-31"
        testID={testIDs.agenda.CONTAINER}
        items={items}
        loadItemsForMonth={loadItems}
        selected={currentDate}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        rowHasChanged={rowHasChanged}
        onDayPress={onDayPress}
        showClosingKnob={true}
      />

      <Modal
        onDismiss={hideModal}
        visible={modalVisible}
        contentContainerStyle={{
          backgroundColor: 'transparent',
          padding: 20,
          width: '90%',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Notunuzu Girin</Text>
            <TextInput
              style={styles.input}
              onChangeText={setText}
              value={text}
              placeholder="Not"
            />

            <Pressable style={styles.button} onPress={() => addNewItem()}>
              <Text style={styles.buttonTextFont}>Ekle</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/*  <Button style={{marginTop: 30}} onPress={showModal}>
        Show
      </Button> */}

      <IconButton
        mode="contained"
        style={styles.addButton}
        icon="plus-circle"
        iconColor={'#535353'}
        size={50}
        onPress={toggleModal}
      />
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 5,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    margin: 12,
    marginHorizontal: 'auto',
    height: 40,   
    borderWidth: 1,
    padding: 10,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    width:widthContent,
  },
  modalView: {
    width:'100%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    width: '100%',
    marginTop: 10,
    backgroundColor: '#0063A9',
    justifyContent: 'center',
    marginHorizontal: 'auto',
    height: 50,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonTextFont: {
    textAlign: 'center',
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  modalText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#0063A9',
    fontWeight: 'bold',
    marginBottom: 15,
 
  },
});

export default Calendar;
