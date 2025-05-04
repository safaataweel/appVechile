import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../Components/Colors/Colors';

const ServiceDetails = ({ route, navigation }) => {
  // Correctly destructure route.params
  const { serviceName, workshopName, price, workshopRating, image, serviceDescription, distance} = route.params || {};

  return (
    <View style={{ backgroundColor: Colors.white, height: '100%' }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Service Image */}
        <Image 
          source={{ uri: image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTndajZaCUGn5HCQrAQIS6QBUNU9OZjAgXzDw&s" }}
          style={styles.serviceImage}
          resizeMode="cover"
        />
        
        {/* Workshop Info - Now Clickable */}
        <TouchableOpacity 
          style={styles.innercard}
          onPress={() => navigation.navigate('WorkshopDetails')}
        >
          <View style={styles.workshopContainer}>
            <View>
              <Text style={styles.label}>Workshop</Text>
              <Text style={styles.value}>{workshopName || 'Workshop Name'}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={Colors.darkGray} />
          </View>
        </TouchableOpacity>
        
        {/* Service Info */}
        <View style={styles.innercard}>
          <Text style={styles.label}>Service</Text>
          <Text style={styles.value}>{serviceName || 'Service Name'}</Text>
          
          {/* Only render this if serviceDescription exists */}
          {serviceDescription && (
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionLabel}>Description:</Text>
              <Text style={styles.descriptionText}>{serviceDescription}</Text>
            </View>
          )}
        </View>

        {/* Location/Distance Section */}
        {distance && (
          <View style={styles.innercard}>
            <Text style={styles.label}>Distance</Text>
            <Text style={styles.value}>{distance} km</Text>
          </View>
        )}
        
        {/* Price Card */}
        <View style={styles.priceCard}>
          <Text style={styles.priceLabel}>Price</Text>
          <Text style={styles.priceValue}>{price || 0}₪</Text>
        </View>
        
        {/* Book Now Button */}
        <TouchableOpacity 
          style={styles.confirmButton}
          onPress={() => navigation.navigate('Book', {
            serviceId: route.params?.serviceId,
            workshopName: workshopName,
            price: price,
            image: image,
          })}
        >
          <Text style={styles.confirmButtonText}>Book Now</Text>
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
  serviceImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  workshopContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  innercard: {
    backgroundColor: Colors.lightGray,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    color: Colors.darkGray,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
    color: Colors.black,
  },
  descriptionContainer: {
    marginTop: 12,
  },
  descriptionLabel: {
    fontSize: 16,
    color: Colors.darkGray,
    marginBottom: 4,
  },
  descriptionText: {
    fontSize: 14,
    color: Colors.black,
    lineHeight: 20,
  },
 

  priceCard: {
    borderRadius: 12,
    
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
  confirmButton: {
   
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

  viewMoreText: {
    fontSize: 14,
    color: Colors.blue,
    marginRight: 4,
  },
});

export default ServiceDetails;