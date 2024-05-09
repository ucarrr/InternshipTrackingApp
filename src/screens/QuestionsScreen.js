import {
  View,
  TextInput,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {Searchbar, TouchableRipple} from 'react-native-paper';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import {Dimensions} from 'react-native';
import axios from 'axios';
import {URLs, databases} from '../services/index';

const documentCollection = [
  {
    id: 1,
    text: ' Bir şirketin staja uygun olabilmesi için sahip olması gereken özellikler?',
  },
  {
    id: 2,
    text: 'Staj süresince öğrencinin yapması gerekenler maddeler halinde nelerdir?',
  },
  {id: 3, text: 'Puantaj belgesi en geç ayın kaçında verilmeli?'},
  {id: 4, text: 'Staj raporunda olması zorunlu şeyler nelerdir?'},
  {id: 5, text: 'Uzaktan yapılan stajlarda belge teslimi nasıl yapılmalıdır?'},
];

const windowWidth = Dimensions.get('window').width;

const findSectionsWithTerm = (term, faq) => {
  const sections = faq.split('\n\n');
  return sections.filter(section =>
    section.toLowerCase().includes(term.toLowerCase()),
  );
};

export default function QuestionsScreen({navigation}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  //const [documents, setDocuments] = useState(documentCollection);
  const [favoritesData, setDataFavorites] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const url = URLs.BASE_URL + databases.FAQ;
      const response = await axios.get(url);
      console.log('Data:', response.data);
      setDataFavorites(response.data);
      console.log('Faq Data:', favoritesData);
      return response.data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  };

  const handleSearch = text => {
    setSearchQuery(text);
    const results = favoritesData.filter(doc =>
      doc.text.toLowerCase().includes(text.toLowerCase()),
    );
    setSearchResults(results);
  };

  const toggleFavorite = id => {
    const updatedResults = searchResults.map(item => {
      if (item.id === id) {
        return {...item, favorite: !item.favorite};
      }
      return item;
    });
    setSearchResults(updatedResults);
  };

  const renderItem = ({item}) => (
    <View key={item.id} style={styles.item}>
      <Text style={styles.documentText}>{item.question}</Text>
      <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
        <Icon
          style={styles.icon}
          name={item.favorite ? 'heart' : 'hearto'}
          size={24}
          color={item.favorite ? '#DB6D2D' : '#0063A9'}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Questions</Text>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.subtitle}>
            <Text style={styles.subtitleText}>Favorites</Text>
            <Icon name="heart" color="#DB6D2D" size={25} />
          </View>
        </TouchableRipple>
      </View>

      <View style={[styles.searchContainer, {width: windowWidth * 0.9}]}>
        <Searchbar
          theme={{colors: {primary: 'green'}}}
          placeholder="Search"
          onChangeText={handleSearch}
          value={searchQuery}
          iconColor="#DB6D2D"
          borderColor="#0063A9"
          style={{backgroundColor: '#f5f5f5'}}
          onIconPress={() => handleSearch(searchQuery)}
          inputStyle={{color: '#0063A9', fontSize: 16}}
          placeholderTextColor={'#0063A9'}
        />
      </View>
      <FlatList
        data={searchQuery ? searchResults : favoritesData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 35,
    justifyContent: 'center',
  },

  searchInput: {
    flex: 1,
    height: 50,
    borderColor: '#0063A9',
    borderWidth: 3,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: 'white',
    fontSize: 16,
  },

  searchIcon: {
    padding: 10,
    height: 50,
    marginTop: 10,
    paddingHorizontal: 10,
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
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#DB6D2D',
  },

  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: 'white',
  },
  documentText: {
    fontWeight: 'bold',
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 6,
    color: '#0063A9',
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
  subtitle: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 5,
    justifyContent: 'space-evenly',
  },

  subtitleText: {
    color: '#DB6D2D',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 20,
    paddingRight: 3,
    marginTop: 6,
  },
});
