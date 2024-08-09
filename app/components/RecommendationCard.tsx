import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, Appearance } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const RecommendationCard = ({ event }) => {
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
      <Image source={{ uri: `http://eventspick.com/storage/events/${event.image}` }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>{event.title}</Text>
        <View style={styles.detailsContainer}>
          <View style={styles.locationContainer}>
            <Ionicons name="location-sharp" size={14} color={styles.iconColor.color} />
            <Text style={styles.location} numberOfLines={2}>{event?.venue 
              
              ? event.venue 
              : 'Location not available'
              }</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price} >Rs.{event.price}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const commonStyles = {
  card: {
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 10,
    padding: 10,
    alignItems: 'center',
    height: 100,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  infoContainer: {
    marginLeft: 10,
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center', 
    width: '50%',
   
    
  },
  priceContainer: {
    borderRadius: 5,
    paddingVertical: 2,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',

  },
  price: {
    fontSize: 14,
 
  },
};

const darkStyles = StyleSheet.create({
  ...commonStyles,
  card: {
    ...commonStyles.card,
    backgroundColor: '#333',
  },
  title: {
    ...commonStyles.title,
    color: '#fff',
  },
  location: {
    fontSize: 14,
    color: '#aaa',
    marginLeft: 5,
  },
  priceContainer: {
    ...commonStyles.priceContainer,
    backgroundColor: '#ff3b30',
  },
  price: {
    ...commonStyles.price,
    color: '#fff',
  },
  iconColor: {
    color: '#aaa',
  },
});

const lightStyles = StyleSheet.create({
  ...commonStyles,
  card: {
    ...commonStyles.card,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  title: {
    ...commonStyles.title,
    color: '#000',
  },
  location: {
    fontSize: 14,
    color: '#555',
    marginLeft: 5,
  },
  priceContainer: {
    ...commonStyles.priceContainer,
    backgroundColor: '#ff3b30',
  },
  price: {
    ...commonStyles.price,
    color: '#fff',
  },
  iconColor: {
    color: '#555',
  },
});

export default RecommendationCard;
