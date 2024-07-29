import React from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity, Dimensions } from 'react-native';

const { width: viewportWidth } = Dimensions.get('window');

const EventCard = ({ event }) => {
    return (
      <View style={styles.card}>
        <Image source={{ uri: event.image }} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.date}>{event.date}</Text>
          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.description}>{event.description}</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#222',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 10,
        width: viewportWidth * 0.45,
      },
      image: {
        width: '100%',
        height: 120,
      },
      infoContainer: {
        padding: 10,
      },
      date: {
        color: '#888',
        fontSize: 12,
      },
      title: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 5,
      },
      description: {
        color: '#aaa',
        fontSize: 14,
        marginBottom: 10,
      },
      button: {
        backgroundColor: '#555',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
      },
      buttonText: {
        color: '#fff',
        fontSize: 16,
      },
});

export default EventCard;
