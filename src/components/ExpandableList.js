import React from 'react';
import {FlatList, View, Text, StyleSheet, Dimensions} from 'react-native';
import ExpandableListItem from './ExpandableListItem';

const windowWidth = Dimensions.get('window').width;

const ExpandableList = ({data}) => {
  // Ensure there is a fallback if data is empty
  if (!data || data.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No data available.</Text>
      </View>
    );
  }

  const renderItem = ({item}) => <ExpandableListItem item={item} />;

  return (
    <FlatList
      data={data}
      keyExtractor={item => item._id.toString()} 
      renderItem={renderItem}
     
      style={styles.list}
    />
  );
};

// Styles
const styles = StyleSheet.create({
  list: {
    flex: 1,    
    //backgroundColor: 'transparent',
    width: windowWidth,   
    backgroundColor:'red',
    borderRadius:20,
    borderColor:'#0063A9',   
    borderWidth:1,
 
  
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ExpandableList;
