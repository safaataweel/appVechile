import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './WorkshopCardStyle';
import { Ionicons } from '@expo/vector-icons';

const WorkshopCard = ({ image, name, rating, distance, price, onBookPress }) => {
  return (
    
    <View style={styles.card} >
      <Image source={{ uri: image }} style={styles.image} />

      <View style={styles.info}>
        <View style={styles.topInfo}>
          <Text style={styles.name} numberOfLines={1}>{name}</Text>

          <Text style={styles.price}>{price}₪</Text>
        </View>

        <View style={styles.middleInfo}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
        </View>

        <View style={styles.bottomInfo}>
          <Text style={styles.distance}>{distance} km</Text>

          <TouchableOpacity style={styles.bookButton} onPress={onBookPress}>
            <Text style={styles.bookButtonText}>Book</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    
  );
};

export default WorkshopCard;
