import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, ScrollView, Appearance, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';

const EventDetailsScreen = () => {
  const route = useRoute();
  const { event } = route.params as { event: any };
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setColorScheme(colorScheme);
    });
    return () => subscription.remove();
  }, []);

  const styles = colorScheme === 'dark' ? darkStyles : lightStyles;

  const prices = [
    { type: 'Earlybird', price: '500', points: ['Limited Time Offer', '', '', '', ''], soldOut: false },
    { type: 'General', price: '1000', points: ['Point 1', 'Point 2', '', '', ''], soldOut: true },
    { type: 'VIP', price: '5000', points: ['Point 1', 'Point 2', 'Point 3', '', ''], soldOut: false },
    { type: 'VVIP', price: '6001', points: ['Point 1', 'Point 2', 'Point 3', 'Point 4', ''], soldOut: true },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={{ uri: event.image }} style={styles.mainImage} />
        <View style={styles.headerOverlay}>
          <Text style={styles.headerCategory}>{event.category}</Text>
          <Text style={styles.headerTitle}>{event.title}</Text>
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.row}>
          <Text style={styles.label}>Date</Text>
          <Text style={styles.date}>{event.date}</Text>
          <Text style={styles.price}>{event.price}</Text>
        </View>
        <Text style={styles.description}>{event.description}</Text>
        <View style={styles.addressContainer}>
          <Text style={styles.label}>Address</Text>
          <Text style={styles.address}>{event.address}</Text>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: event.location.lat,
              longitude: event.location.lng,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker coordinate={{ latitude: event.location.lat, longitude: event.location.lng }} />
          </MapView>
        </View>
        <Text style={styles.swipeText}>Swipe to view the Prices</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.priceScrollContainer}>
          {prices.map((price, index) => (
            <View key={index} style={styles.priceCard}>
              <Text style={styles.priceType}>{price.type}</Text>
              <Text style={styles.priceValue}>{price.price} / Person</Text>
              {price.points.map((point, idx) => (
                point ? (
                  <View key={idx} style={styles.pointRow}>
                    <Ionicons name="ellipse" size={10} style={styles.iconStyle} />
                    <Text style={styles.pricePoint}>{point}</Text>
                  </View>
                ) : null
              ))}
              <View style={styles.buttonContainer}>
                {price.soldOut ? (
                  <Image source={{ uri: 'https://grab-tickets.com/frontend/images/sold-out.png' }} style={styles.soldOutImage} />
                ) : (
                  <TouchableOpacity style={styles.button} onPress={() => alert('Ticket Purchased!')}>
                    <Text style={styles.buttonText}>Get Ticket</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const commonStyles = {
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  headerContainer: {
    position: 'relative',
  },
  mainImage: {
    width: '100%',
    height: 250,
  },
  headerOverlay: {
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  headerCategory: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  detailsContainer: {
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 16,
    color: '#666',
  },
  price: {
    fontSize: 16,
    color: '#f56',
    marginLeft: 10,
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  addressContainer: {
    marginBottom: 20,
  },
  address: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  map: {
    width: '100%',
    height: 150,
  },
  swipeText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  priceScrollContainer: {
    paddingBottom: 20,
  },
  priceCard: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    width: 200,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 300,
  },
  priceType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffd700',
    marginBottom: 5,
  },
  priceValue: {
    fontSize: 16,
    color: '#ffd700',
    marginBottom: 10,
  },
  pointRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  pricePoint: {
    fontSize: 14,
    color: '#ffd700',
    marginLeft: 5,
  },
  soldOutImage: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 'auto',
  },
  button: {
    backgroundColor: '#ffd700',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  iconStyle: {
    color: '#ffd700',
  },
};

const darkStyles = StyleSheet.create({
  ...commonStyles,
  container: {
    ...commonStyles.container,
    backgroundColor: '#1c1c1c',
  },
  headerOverlay: {
    ...commonStyles.headerOverlay,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  label: {
    ...commonStyles.label,
    color: '#fff',
  },
  date: {
    ...commonStyles.date,
    color: '#ccc',
  },
  description: {
    ...commonStyles.description,
    color: '#ddd',
  },
  address: {
    ...commonStyles.address,
    color: '#ddd',
  },
  priceCard: {
    ...commonStyles.priceCard,
    backgroundColor: '#2c2c2c',
  },
  priceType: {
    ...commonStyles.priceType,
    color: '#ffd700',
  },
  priceValue: {
    ...commonStyles.priceValue,
    color: '#ffd700',
  },
  pricePoint: {
    ...commonStyles.pricePoint,
    color: '#ffd700',
  },
});

const lightStyles = StyleSheet.create({
  ...commonStyles,
  container: {
    ...commonStyles.container,
    backgroundColor: '#fff',
  },
  headerOverlay: {
    ...commonStyles.headerOverlay,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  label: {
    ...commonStyles.label,
    color: '#333',
  },
  date: {
    ...commonStyles.date,
    color: '#666',
  },
  description: {
    ...commonStyles.description,
    color: '#333',
  },
  address: {
    ...commonStyles.address,
    color: '#333',
  },
  priceCard: {
    ...commonStyles.priceCard,
    backgroundColor: '#f0f0f0',
  },
  priceType: {
    ...commonStyles.priceType,
    color: '#ffd700',
  },
  priceValue: {
    ...commonStyles.priceValue,
    color: '#ffd700',
  },
  pricePoint: {
    ...commonStyles.pricePoint,
    color: '#ffd700',
  },
});

export default EventDetailsScreen;
