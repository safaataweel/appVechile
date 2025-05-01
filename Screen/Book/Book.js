import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Colors from '../../Components/Colors/Colors';

const MOCK_SERVICES = [
  { id: 1, name: 'Oil Change', price: 15 },
  { id: 2, name: 'Tire Rotation', price: 20 },
  { id: 3, name: 'Engine Check', price: 40 },
  { id: 4, name: 'Battery Replacement', price: 35 },
];

const Book = ({ route }) => {
  const { workshopName } = route.params;

  const [selectedServices, setSelectedServices] = useState([MOCK_SERVICES[0]]);
  const [scheduledDate, setScheduledDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [street] = useState('Al-Tireh Street');
  const [city] = useState('Ramallah');

  const totalPrice = selectedServices.reduce((sum, s) => sum + s.price, 0);

  const handleAddService = () => {
    const available = MOCK_SERVICES.filter(
      (s) => !selectedServices.some((sel) => sel.id === s.id)
    );
    if (available.length > 0) {
      setSelectedServices([...selectedServices, available[0]]);
    } else {
      alert('No more services to add.');
    }
  };

  const handleRemoveService = (id) => {
    setSelectedServices(selectedServices.filter((s) => s.id !== id));
  };

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (date) => {
    setScheduledDate(date);
    hideDatePicker();
  };

  const handleConfirmBooking = () => {
    console.log('Booking Info:', {
      workshopName,
      scheduledDate,
      location: `${street}, ${city}`,
      services: selectedServices,
      totalPrice,
    });
  };

  return (
    <View style={{ backgroundColor: Colors.white , height: '100%'}}>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Confirm Your Booking</Text>


      <View style={styles.card}>
        <Text style={styles.label}>Workshop</Text>
        <Text style={styles.value}>{workshopName}</Text>

        <Text style={styles.label}>Services</Text>
        {selectedServices.map((service) => (
          <View key={service.id} style={styles.serviceCard}>
            <Text style={styles.serviceText}>
              {service.name} - {service.price}₪
            </Text>
            <TouchableOpacity onPress={() => handleRemoveService(service.id)}>
              <Text style={styles.removeText}>✕</Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity style={styles.addButton} onPress={handleAddService}>
          <Text style={styles.addButtonText}>+ Add Another Service</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Choose Date</Text>
        <TouchableOpacity onPress={showDatePicker} style={styles.datePicker}>
          <Text style={styles.dateText}>{scheduledDate.toLocaleString()}</Text>
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />

        <Text style={styles.label}>Address</Text>
        <View style={styles.input}>
          <Text>{street}, {city}</Text>
        </View>

        <TouchableOpacity style={styles.secondaryButton} onPress={() => alert('Coming soon!')}>
          <Text style={styles.secondaryButtonText}>Use My Current Location</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.priceCard}>
        <Text style={styles.priceLabel}>Total Price</Text>
        <Text style={styles.priceValue}>{totalPrice}₪</Text>
      </View>

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmBooking}>
        <Text style={styles.confirmButtonText}>Confirm Booking</Text>
      </TouchableOpacity>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 20,
    textAlign: 'center',
  },
  priceCard: {
    backgroundColor: Colors.lightGray,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 18,
    color: Colors.darkGray,
  },
  priceValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.black,
  },
  card: {
    backgroundColor: Colors.lightGray,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    color: Colors.darkGray,
    marginTop: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
  },
  serviceCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    padding: 12,
    borderRadius: 10,
    marginVertical: 6,
    alignItems: 'center',
  },
  serviceText: {
    fontSize: 15,
    color: Colors.black,
  },
  removeText: {
    color: Colors.red,
    fontWeight: 'bold',
    fontSize: 20,
  },
  addButton: {
    marginTop: 10,
    backgroundColor:'#ddd',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: Colors.darkGray,
    fontWeight: 'bold',
  },
  datePicker: {
    backgroundColor: Colors.white,
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  dateText: {
    fontSize: 16,
    color: Colors.black,
  },
  input: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
  },
  secondaryButton: {
    marginTop: 16,
    backgroundColor: '#ddd',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: Colors.black,
    fontWeight: 'bold',
  },
  confirmButton: {
    marginTop: 10,
    backgroundColor: Colors.blue,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: 'bold',
  },
});

export default Book;
