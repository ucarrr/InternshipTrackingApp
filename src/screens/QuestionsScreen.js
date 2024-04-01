import { View, TextInput, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

const documentCollection = [
  { id: 1, text: 'Şirketin staja uygun olabilmesi için sahip olması gereken özellikler?' },
  { id: 2, text: 'Bu staj süresince öğrencinin yapması gerekenler?' },
  { id: 3, text: 'Puantaj belgesi en geç ayın kaçında verilmeli?' },
  { id: 3, text: 'Staj raporunda olması zorunlu şeyler nelerdir?' },
  { id: 3, text: 'Uzaktan yapılan stajlarda belge teslimi nasıl olmalı?' },

];

// belgedeki maddeleri bulur
const findSectionsWithTerm = (term, document) => {
  const sections = document.split('\n\n');  
  return sections.filter(section => section.toLowerCase().includes(term.toLowerCase()));
};

export default function QuestionsScreen({ navigation }) {

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const results = documentCollection.map(doc => ({
      ...doc,
      sections: findSectionsWithTerm(text, doc.text)
    })).filter(result => result.sections.length > 0);
    setSearchResults(results);
  };

  const toggleFavorite = (id) => {
    const updatedResults = searchResults.map(item => {
      if (item.id === id) {
        return { ...item, favorite: !item.favorite };
      }
      return item;
    });
    setSearchResults(updatedResults);
  };

  const renderItem = ({ item }) => (
    <View key={item.id} style={styles.item}>
      <Text style={styles.documentText}>{item.text}</Text>
      <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
        <Icon name={item.favorite ? 'heart' : 'hearto'} size={24} color={item.favorite ? '#DB6D2D' : '#0063A9'}/> 
      </TouchableOpacity>
    </View>
  );

  return (
  <View style={styles.container}>
     <View style={styles.header}>
        <Text style={styles.headerText}>Questions</Text>
      </View>
   <View style={styles.searchContainer}>
   <TextInput
      style={styles.searchInput}
      placeholder="Ara..."
      onChangeText={handleSearch}
      value={searchQuery}
    />
    <TouchableOpacity style={styles.searchButton} onPress={() => handleSearch(searchQuery)}>
      <Text style={styles.searchButtonText}>Ara</Text>
    </TouchableOpacity>
    </View>
    <FlatList
      data={searchResults}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
    />
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f8ff',
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems:'flex-start',
    marginBottom: 10,
    
  },

  searchInput: {
    flex:1,
    height: 50,
    borderColor: '#0063A9',
    borderWidth: 4,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop:10,
    backgroundColor:'white',
  
  },

  searchButton: {
    backgroundColor: '#0063A9',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop:15,
    height:40,
    marginLeft:5,
  },

  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    justifyContent:'center',
    alignItems:'center',
    fontSize:15,
  },

  header: {
    marginTop: 20,
    marginRight: 10,
    alignSelf: 'flex-start',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },

  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection:'row',
    marginBottom:10,
    justifyContent:'space-evenly',
    alignItems:'flex-start'
  },
  documentText: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sectionContainer: {
    marginLeft: 15,
    
  },
  sectionText: {
    marginBottom: 5,
  },
})