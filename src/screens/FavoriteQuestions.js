import React, { useState } from 'react';
import { View, TextInput, Button, Text, FlatList } from 'react-native';


const documents = [
    { id: 1, text: 'Bir şirketin staja uygun olabilmesi için sahip olması gereken özellikler?' },
    { id: 2, text: 'Staj süresince öğrencinin yapması gerekenler maddeler halinde nelerdir?' },
    { id: 3, text: 'Puantaj belgesi en geç ayın kaçında verilmeli?' },
    { id: 4, text: 'Staj raporunda olması zorunlu şeyler nelerdir?' },
    { id: 5, text: 'Uzaktan yapılan stajlarda belge teslimi nasıl yapılmalıdır?' },
];

export default function FavoriteQuestions ({ favoriteItems, removeFavorite }) {
  const renderItem = ({ item }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
      <Text>{item.text}</Text>
      <Button title="Remove" onPress={() => removeFavorite(item.id)} />
    </View>
  );

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Favorilere Eklenenler</Text>
      <FlatList
        data={favoriteItems}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};


