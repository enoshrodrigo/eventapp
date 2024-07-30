import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity, Dimensions, Appearance } from 'react-native';

const { width: viewportWidth } = Dimensions.get('window');

const EventCard = ({ event }) => {
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setColorScheme(colorScheme);
    });
    return () => subscription.remove();
  }, []);

  const styles = colorScheme === 'dark' ? darkStyles : lightStyles;

  return (
    <View style={styles.card}>
      <Image source={{ uri: event.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.date}>{event.date}</Text>
        <Text style={styles.title} numberOfLines={2}>{event.title}</Text>
        <Text style={styles.description} numberOfLines={3}>{event.description}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const commonStyles = {
  card: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
    width: viewportWidth * 0.45,
    borderWidth: 1, // Add border width to all cards for separation
  },
  image: {
    width: '100%',
    height: 120,
  },
  infoContainer: {
    padding: 10,
    flex: 1,
    justifyContent: 'space-between',
  },
  date: {
    fontSize: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  description: {
    fontSize: 14,
    marginBottom: 10,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
  },
};

const darkStyles = StyleSheet.create({
  ...commonStyles,
  card: {
    ...commonStyles.card,
    backgroundColor: '#333',
    borderColor: '#444',
  },
  date: {
    ...commonStyles.date,
    color: '#888',
  },
  title: {
    ...commonStyles.title,
    color: '#fff',
  },
  description: {
    ...commonStyles.description,
    color: '#aaa',
  },
  button: {
    ...commonStyles.button,
    backgroundColor: '#555',
  },
  buttonText: {
    ...commonStyles.buttonText,
    color: '#fff',
  },
});

const lightStyles = StyleSheet.create({
  ...commonStyles,
  card: {
    ...commonStyles.card,
    backgroundColor: '#fff',
    borderColor: '#ccc',
  },
  date: {
    ...commonStyles.date,
    color: '#555',
  },
  title: {
    ...commonStyles.title,
    color: '#000',
  },
  description: {
    ...commonStyles.description,
    color: '#555',
  },
  button: {
    ...commonStyles.button,
    backgroundColor: '#ff3b30',
  },
  buttonText: {
    ...commonStyles.buttonText,
    color: '#fff',
  },
});

export default EventCard;
