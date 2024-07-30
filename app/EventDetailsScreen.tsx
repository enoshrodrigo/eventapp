// app/components/EventDetailsScreen.tsx
import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';

const EventDetailsScreen = () => {
  const route = useRoute();
  const { event } = route.params as { event: any };
  console.log('kkk',route.params);

  return (
    <View style={styles.container}>
      <Image source={{ uri: event.image }} style={styles.mainImage} />
      <Text style={styles.title}>{event.title}</Text>
      <View style={styles.detailsContainer}>
        <View style={styles.locationContainer}>
          <Ionicons name="location-sharp" size={14} color="#aaa" />
          <Text style={styles.location}>{event.location}</Text>
        </View>
        <Text style={styles.date}>{event.date}</Text>
      </View>
      <Text style={styles.description}>{event.description}</Text>
      <View style={styles.extraDetails}>
        <Text style={styles.ticketsSold}>Tickets Sold: 50</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#333', // Adjust based on your theme
    },
    mainImage: {
      width: '100%',
      height: 200,
      borderRadius: 10,
      marginBottom: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 10,
    },
    detailsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
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
    date: {
      fontSize: 14,
      color: '#aaa',
    },
    description: {
      fontSize: 16,
      color: '#ddd',
      marginBottom: 20,
    },
    extraDetails: {
      borderTopWidth: 1,
      borderTopColor: '#444',
      paddingTop: 10,
    },
    ticketsSold: {
      fontSize: 14,
        color: '#aaa',
    },
    });

export default EventDetailsScreen;