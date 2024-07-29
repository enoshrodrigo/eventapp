import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Ensure you have expo/vector-icons installed

const RecommendationCard = ({ event }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: event.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>{event.title}</Text>
        <View style={styles.detailsContainer}>
          <View style={styles.locationContainer}>
            <Ionicons name="location-sharp" size={14} color="#aaa" />
            <Text style={styles.location}>{event.location}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{event.price}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#333',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 10,
    padding: 10,
    alignItems: 'center',
    height: 100, // Ensure cards have consistent height
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  infoContainer: {
    marginLeft: 10,
    flex: 1,
    justifyContent: 'space-between', // Distribute space evenly
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end', // Align items to the bottom
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 14,
    color: '#aaa',
    marginLeft: 5,
  },
  priceContainer: {
    backgroundColor: '#ff3b30',
    borderRadius: 5,
    paddingVertical: 2,
    paddingHorizontal: 8, // Adjust horizontal padding to ensure consistent size
    justifyContent: 'center',
    alignItems: 'center',
  },
  price: {
    fontSize: 14,
    color: '#fff',
  },
});

export default RecommendationCard;
