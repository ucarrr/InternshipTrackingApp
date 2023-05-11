import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Timeline from 'react-native-timeline-flatlist';

const TwoColumnTmeLine = () => {
  const data = [
    {
      time: 'First day',
      title: 'Event 1',
      description:
        'Lorem Ipsum is simply dummy text of the printing.',
        lineColor: 'darkblue',
      icon: require('../img/place_holder.png'),
      
    },
    {
      time: 'Second day',
      title: 'Event 2',
      lineColor: 'darkblue',
      description:
        'Lorem Ipsum is simply dummy text of the printing.',
      icon: require('../img/place_holder.png'),
      imageUrl:
        'https://capital-placement.b-cdn.net/wp-content/uploads/2019/10/2787860-e1571404666218.jpg.webp',
    },
    {
      time: 'Third day ',
      title: 'Event 3',
      lineColor: 'darkblue',
      icon: require('../img/place_holder.png'),
    },
    {
      time: '4th day',
      title: 'Event 4',
      description:
        'Lorem Ipsum is simply dummy text of the printing.',
        lineColor: 'darkblue',
      icon: require('../img/place_holder.png'),
      imageUrl:
        'https://capital-placement.b-cdn.net/wp-content/uploads/2019/10/2787860-e1571404666218.jpg.webp',
    },
    {
      time: '5th day',
      title: 'Event 5',
      lineColor: 'darkblue',
      description:
        'Lorem Ipsum is simply dummy text of the printing.',
      icon: require('../img/place_holder.png'),
      imageUrl:
        'https://capital-placement.b-cdn.net/wp-content/uploads/2019/10/2787860-e1571404666218.jpg.webp',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Internship Timeline</Text>
      <Timeline
        data={data}
        circleSize={20}
        circleColor="rgba(0,0,0,0)"
        lineColor="rgb(45,156,219)"
        timeContainerStyle={{minWidth: 52, marginTop: 0}}
        timeStyle={{
          textAlign: 'center',
          backgroundColor: '#0598FB',
          color: 'white',
          padding: 5,
          borderRadius: 13,
        }}
        descriptionStyle={{color: 'gray'}}
        options={{
          style: {paddingTop: 5},
        }}
        innerCircle={'icon'}
        onEventPress={(item) => 
          alert(`${item.title} at ${item.time}`)
        }
        separator={false}
        detailContainerStyle={{
          marginBottom: 20,
          paddingLeft: 5,
          paddingRight: 5,
          backgroundColor: '#BBDAFF',
          borderRadius: 10,
        }}
        columnFormat="two-column"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    padding: 24,
    fontSize: 23,
    textAlign: 'center',
    fontWeight: 'bold',
    color:'#000080',
  },
});

export default TwoColumnTmeLine;