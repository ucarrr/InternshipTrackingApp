import { View, TextInput, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { Searchbar, TouchableRipple } from 'react-native-paper';
import Icon2 from 'react-native-vector-icons/FontAwesome';

const documentCollection = [
  { id: 1, text: 'Bir şirketin staja uygun olabilmesi için sahip olması gereken özellikler?' },
  { id: 2, text: 'Staj süresince öğrencinin yapması gerekenler maddeler halinde nelerdir?' },
  { id: 3, text: 'Puantaj belgesi en geç ayın kaçında verilmeli?' },
  { id: 4, text: 'Staj raporunda olması zorunlu şeyler nelerdir?' },
  { id: 5, text: 'Uzaktan yapılan stajlarda belge teslimi nasıl yapılmalıdır?' },

];

 const findSectionsWithTerm = (term, document) => {
  const sections = document.split('\n\n');
  return sections.filter(section => section.toLowerCase().includes(term.toLowerCase()));
};

export default function QuestionsScreen({ navigation }) {

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [documents, setDocuments] = useState(documentCollection);
  const [favorites, setFavorites] = useState([]);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const results = documentCollection.filter(doc => doc.text.toLowerCase().includes(text.toLowerCase()));
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
        <Icon style={styles.icon} name={item.favorite ? 'heart' : 'hearto'} size={24} color={item.favorite ? '#DB6D2D' : '#0063A9'} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Questions</Text>
      </View>
      <TouchableRipple onPress={() => {}}>
        <View style={styles.menuItem}>
        <Text style={styles.menuItemText}>Favorites</Text>
          <Icon name='heart' color='#DB6D2D' size={25}/>
        </View>
      </TouchableRipple>
      <View style={styles.searchContainer}>
      <Searchbar
      theme={{ colors: { primary: 'green' } }}
      placeholder="Search"
      onChangeText={handleSearch}
      value={searchQuery}
      iconColor='#DB6D2D'
      borderColor= '#0063A9'
      style={{backgroundColor: '#f5f5f5'}}
      onIconPress={ () => handleSearch(searchQuery)}
      inputStyle={{color: '#0063A9', fontSize:16}}
      placeholderTextColor={'#0063A9'}
    />
      </View>
      <FlatList
        data={searchQuery ? searchResults:documents}
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
    backgroundColor: 'white',
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 30,
    marginTop:35,

  },

  searchInput: {
    flex: 1,
    height: 50,
    borderColor: '#0063A9',
    borderWidth: 3,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: 'white',
    fontSize: 16,
  },

  searchIcon:{
    padding:10,
    height:50,
    marginTop:10,
    paddingHorizontal:10,
    
  },

  searchButton: {
    backgroundColor: '#0063A9',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 15,
    height: 40,
    marginLeft: 5,
  },

  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 15,
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
    color:'#DB6D2D'
  },

  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderRadius:15,
    backgroundColor:'#f5f5f5'
  },
  documentText: {
    fontWeight: 'bold',
    marginBottom: 5,
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    paddingVertical: 6,
    color: '#0063A9'

  },
  icon: {
    fontWeight: 'bold',
    marginBottom: 5,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: 8,
  },

  sectionContainer: {
    marginLeft: 15,

  },
  sectionText: {
    marginBottom: 5,
  },
  menuItem:{
    flexDirection:'row',
    paddingVertical:5,
    paddingHorizontal:5,
    alignItems:'flex-end',
    justifyContent:'flex-end',
  },

  menuItemText:{
    color: '#DB6D2D',
    marginLeft:20,
    fontWeight:'600',
    fontSize:14,
    lineHeight:20
  },
})