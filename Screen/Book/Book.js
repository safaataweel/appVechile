import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';

const Book = ({ route }) => {
  const { serviceId, workshopName, price, image } = route.params;
  
  console.log("Booking Parameters:", {
    serviceId,
    workshopName,
    price,
    image
  });

  return (
    <View>
      <Text>Booking Screen</Text>
      <Text>Servic ID: {serviceId}</Text>
      <Text>Workshop Name: {workshopName}</Text>
      <Text>Price: {price}₪</Text>
    </View>
  );
};

export default Book;
