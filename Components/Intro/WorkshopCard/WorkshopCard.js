// components/WorkshopCard.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';



const WorkshopCard = ({ image, name, rating, distance, price, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{name}</Text>
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
          <Text style={styles.distance}>• {distance} km away</Text>
        </View>
        <Text style={styles.price}>${price.toFixed(2)}</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Book Now</Text>
        </TouchableOpacity>
        <View style={styles.buttonRow}>
  
  <TouchableOpacity style={[styles.button, styles.moreInfoButton]}>
    <Text style={styles.buttonRowtext}>More Info</Text>
  </TouchableOpacity>
</View>
      </View>
    </TouchableOpacity>
  );
};

export default WorkshopCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 10,
    borderRadius: 16,
    overflow: 'hidden',
    flexDirection: 'row',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  image: {
    width: 120,
    height: '100%',
  },
  info: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 14,
    marginLeft: 4,
    color: '#555',
  },
  distance: {
    marginLeft: 8,
    fontSize: 13,
    color: '#999',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#086189',
  },
  button: {
    marginTop: 6,
    backgroundColor: '#89D5A3', // slightly darker than #A4E1B8
    paddingVertical: 6,
    borderRadius: 15,
    alignItems: 'center',
    borderColor: '#3A9D65', // darker green border
    borderWidth: 2, // make sure the border is visible
    width:90,
    alignSelf: 'flex-end', // <-- aligns to left

  },
  
  buttonText: {
    color: '#3A9D65',
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center', // ensures vertical alignment

   
  },
  buttonRowtext: {
    fontWeight: '600',
    color: '#003B5C',
  },
  
  moreInfoButton: {
    backgroundColor: '#A4C8E1',
    borderColor: '#003B5C',
  },
});
