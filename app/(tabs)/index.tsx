import React, { useState } from 'react';
import { StyleSheet, ScrollView, FlatList, Image, Text, View, TextInput, TouchableOpacity, Dimensions, Animated } from 'react-native';

const { width: viewportWidth } = Dimensions.get('window');

export default function HomeScreen() {
  const [scrollX] = useState(new Animated.Value(0));

  const featuredEvents = [
    { id: '1', title: 'The Weekend', date: 'Dec 21', image: 'https://static.vecteezy.com/system/resources/previews/029/332/148/non_2x/ai-generative-dj-playing-and-mixing-music-in-nightclub-party-at-night-edm-dance-music-club-with-crowd-of-young-people-free-photo.jpg' },
    { id: '2', title: 'Fire Show', date: 'Dec 23', image: 'https://5.imimg.com/data5/FJ/RQ/MY-8385427/dj-party.jpg' },
    { id: '3', title: 'Fire Show', date: 'Dec 23', image: 'https://5.imimg.com/data5/FJ/RQ/MY-8385427/dj-party.jpg' },
    { id: '4', title: 'Fire Show', date: 'Dec 23', image: 'https://5.imimg.com/data5/FJ/RQ/MY-8385427/dj-party.jpg' },
    { id: '5', title: 'Fire Show', date: 'Dec 23', image: 'https://5.imimg.com/data5/FJ/RQ/MY-8385427/dj-party.jpg' },
    { id: '6', title: 'Fire Show', date: 'Dec 23', image: 'https://5.imimg.com/data5/FJ/RQ/MY-8385427/dj-party.jpg' },
    { id: '7', title: 'Fire Show', date: 'Dec 23', image: 'https://5.imimg.com/data5/FJ/RQ/MY-8385427/dj-party.jpg' },
    // Add more events here
  ];

  const renderEventItem = ({ item, index }) => {
    const inputRange = [
      (index - 1) * viewportWidth * 0.8,
      index * viewportWidth * 0.8,
      (index + 1) * viewportWidth * 0.8,
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View style={[styles.eventCard, { transform: [{ scale }] }]}>
        <Image source={{ uri: item.image }} style={styles.eventImage} />
        <View style={styles.textContainer}>
          <Text style={styles.eventDate}>{item.date}</Text>
          <Text style={styles.eventTitle}>{item.title}</Text>
        </View>
      </Animated.View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.date}>DECEMBER 16, 9:10 PM</Text>
        <Text style={styles.title}>Explore events</Text>
        <View style={styles.searchContainer}>
          <TextInput style={styles.searchInput} placeholder="Search" placeholderTextColor="#888" />
        </View>
      </View>

      <Text style={styles.sectionTitle}>FEATURED</Text>
      <Animated.FlatList
        horizontal
        data={featuredEvents}
        renderItem={renderEventItem}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.featuredList}
        snapToInterval={viewportWidth * 0.8}
        decelerationRate="fast"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      />

      <Text style={styles.sectionTitle}>FOR YOU</Text>
      <View style={styles.promoCard}>
        <Text style={styles.promoText}>Claim 1 free ticket!</Text>
        <Text style={styles.promoSubText}>Share an event with friends and get 1 ticket.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  date: {
    color: '#888',
    fontSize: 12,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  searchContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 5,
  },
  searchInput: {
    color: '#fff',
    fontSize: 16,
    padding: 10,
    flex: 1,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  featuredList: {
    paddingVertical: 10,
  },
  eventCard: {
    width: viewportWidth * 0.8,
    marginRight: 10,
    backgroundColor: '#222',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventImage: {
    width: '100%',
    height: 200,
  },
  textContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  eventDate: {
    backgroundColor: '#fff',
    color: '#000',
    padding: 5,
    borderRadius: 5,
    fontSize: 12,
    marginBottom: 5,
  },
  eventTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  promoCard: {
    backgroundColor: '#444',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginVertical: 10,
  },
  promoText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  promoSubText: {
    color: '#aaa',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
});
