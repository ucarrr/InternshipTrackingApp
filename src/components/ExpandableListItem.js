import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
const windowWidth = Dimensions.get('window').width;
const widthContent = windowWidth * 0.8;
const widthFav = windowWidth * 0.2;

const ExpandableListItem = ({item}) => {
  const [expanded, setExpanded] = useState(false);

  console.log('ExpandableListItem: Question' + item.question + ' Answer ' + item.answer);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const toggleFavorite = id => {
    const updatedResults = searchResults.map(item => {
      if (item.question.id === id) {
        return {...item.question, favorite: !favorite};
      }
      return item.question;
    });
    setSearchResults(updatedResults);
  };

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <TouchableOpacity onPress={toggleExpand} style={styles.itemTouchable}>
          <Text style={styles.itemTitle}>{item.question}</Text>
        </TouchableOpacity>
        {expanded && <Text style={styles.itemContent}>{item.answer}</Text>}
      </View>
      <View style={styles.favIcon}>
        <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
          <Icon
            name={item.favorite ? 'heart' : 'hearto'}
            size={24}
            color={item.favorite ? '#DB6D2D' : '#0063A9'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: 'white',
    elevation: 3,
    borderColor: '#ccc',
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 15,
    width: windowWidth,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'column',
    marginBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: 'white',
    width: widthContent,
  },
  favIcon: {
    width: widthFav,
  },
  itemTouchable: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  itemContent: {
    textAlign: 'left',
    marginTop: 10,
    fontSize: 14,
    color: '#666',
  },
  icon: {
    fontWeight: 'bold',
    marginBottom: 5,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: 8,
  },
});

export default ExpandableListItem;
