import React, { useState } from 'react';
import { StyleSheet, ScrollView, FlatList, Image, Text, View, TextInput, Dimensions, Animated } from 'react-native';

const { width: viewportWidth } = Dimensions.get('window');

export default function HomeScreen() {
  const [scrollX] = useState(new Animated.Value(0));

  const featuredEvents = [
    { id: '1', title: 'The Weekend', date: 'Dec 21', image: 'https://static.vecteezy.com/system/resources/previews/029/332/148/non_2x/ai-generative-dj-playing-and-mixing-music-in-nightclub-party-at-night-edm-dance-music-club-with-crowd-of-young-people-free-photo.jpg' },
    { id: '2', title: 'Rap Show', date: 'Dec 22', image: 'http://eventspick.com/storage/events/1722023528_66a3fe68a5e6c.jpeg' },
    { id: '3', title: 'Bubble Show', date: 'Dec 24', image: 'https://cdns-images.dzcdn.net/images/cover/8764171cd436e4d1063dd76e7aad7895/1900x1900-000000-80-0-0.jpg' },
    { id: '4', title: 'Fire Show', date: 'Dec 28', image: 'https://cdns-images.dzcdn.net/images/cover/5b792573f2789ce67c14bfd9cc3b9926/1900x1900-000000-80-0-0.jpg' },
    // Add more events here
  ];

  const renderEventItem = ({ item, index }) => {
    return (
      <View style={styles.eventCard}>
        <Image source={{ uri: item.image }} style={styles.eventImage} />
        <View style={styles.overlay}>
          <Text style={styles.eventDate}>{item.date}</Text>
          <Text style={styles.eventTitle}>{item.title}</Text>
        </View>
      </View>
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
      <FlatList
        horizontal
        data={featuredEvents}
        renderItem={renderEventItem}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.featuredList}
        snapToInterval={viewportWidth * 0.8}
        decelerationRate="fast"
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
    height: 180, // Reduced height for all cards
  },
  eventImage: {
    width: '100%',
    height: '100%', // Adjusted height to cover entire card
    position: 'absolute',
    top: 0,
    left: 0,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay for better text visibility
    alignItems: 'center',
  },
  eventDate: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
