import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import ExpandableListItem from './ExpandableListItem';

const ExpandableList = ({ data }) => {
  // Ensure there is a fallback if data is empty
  if (!data || data.length === 0) {
    return <View style={styles.centered}><Text>No data available.</Text></View>;
  }

  const renderItem = ({ item }) => (
    <ExpandableListItem item={item} />
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item._id.toString()} // Assuming _id is unique and always present
      renderItem={renderItem}
      scrollEnabled={false}
      style={styles.list}
    />
  );
};

// Styles
const styles = StyleSheet.create({
  list: {
    backgroundColor: 'transparent',
    width: '100%',
   
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ExpandableList;
