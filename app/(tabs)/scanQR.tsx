// Code for scanning QR codes and marking tickets as attended

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity, Alert, Image, Appearance } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner'; // Import BarCodeScanner

const sampleTickets = [
  { code: '12345', attended: false, eventName: 'Concert', eventDate: '2024-08-10', eventLocation: 'City Hall', image: 'https://www.electriclove.at/en/wp-content/uploads/sites/2/2023/04/Electric-Love-Festival-2023-1-scaled.jpg' },
  { code: '67890', attended: false, eventName: 'Festival', eventDate: '2024-08-15', eventLocation: 'Central Park', image: 'http://eventspick.com/storage/events/1722023528_66a3fe68a5e6c.jpeg' },
];

const ScanQR = () => {
  const [tickets, setTickets] = useState(sampleTickets);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [eventStarted, setEventStarted] = useState(true); // Update based on event start time

  useEffect(() => {
    const getCameraPermission = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    getCameraPermission();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    const ticket = tickets.find(t => t.code === data);

    if (ticket) {
      if (ticket.attended) {
        Alert.alert('Ticket already attended', 'This ticket has already been marked as attended.');
      } else {
        setScanResult(ticket);
        setModalVisible(true);
      }
    } else {
      Alert.alert('QR not valid', 'This QR code is not valid for any ticket.');
    }
  };

  const handleAttend = () => {
    if (scanResult) {
      setTickets(tickets.map(t => t.code === scanResult.code ? { ...t, attended: true } : t));
      setModalVisible(false);
      Alert.alert('Attendance marked', 'This ticket has been marked as attended.');
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  // Determine if the device is in dark mode
  const isDarkMode = Appearance.getColorScheme() === 'dark';

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#333' : '#f8f8f8' }]}>
      {eventStarted ? (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]} // Specify QR code type
        />
      ) : (
        <Text style={[styles.centerText, { color: isDarkMode ? '#ddd' : '#777' }]}>
          The event has not started yet. Please wait until the event start time.
        </Text>
      )}

      {scanned && (
        <TouchableOpacity style={[styles.scanAgainButton, { backgroundColor: isDarkMode ? '#888' : '#333' }]} onPress={() => setScanned(false)}>
          <Text style={styles.buttonText}>Tap to Scan Again</Text>
        </TouchableOpacity>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={[styles.modalContainer, { backgroundColor: isDarkMode ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,0)' }]}>
          <View style={[styles.modalView, { backgroundColor: isDarkMode ? '#1f1f1f' : '#FFFFFF' }]}>
            {scanResult?.image && (
              <Image
                source={{ uri: scanResult.image }}
                style={styles.eventImage}
                resizeMode="cover"
              />
            )}
            <Text style={[styles.modalText, { color: isDarkMode ? '#ddd' : '#000' }]}>
              Ticket Code: {scanResult?.code}
            </Text>
            <Text style={[styles.modalText, { color: isDarkMode ? '#ddd' : '#000' }]}>
              Event: {scanResult?.eventName}
            </Text>
            <Text style={[styles.modalText, { color: isDarkMode ? '#ddd' : '#000' }]}>
              Date: {scanResult?.eventDate}
            </Text>
            <Text style={[styles.modalText, { color: isDarkMode ? '#ddd' : '#000' }]}>
              Location: {scanResult?.eventLocation}
            </Text>
            <TouchableOpacity style={[styles.button, styles.buttonAttend]} onPress={handleAttend}>
              <Text style={styles.textStyle}>Mark as Attended</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerText: {
    fontSize: 18,
    padding: 32,
  },
  scanAgainButton: {
    position: 'absolute',
    bottom: 40,
    padding: 15,
    borderRadius: 10,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  buttonAttend: {
    backgroundColor: '#4CAF50', // Green for "Mark as Attended"
  },
  buttonClose: {
    backgroundColor: '#f44336', // Red for "Close"
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  modalView: {
    width: '90%',
    maxWidth: 400,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  eventImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ScanQR;
