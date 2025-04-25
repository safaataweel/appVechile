import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import carImage from '../../assets/cr2.png'; // adjust the path if needed!

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

//import { API_URL } from '@env';


const primaryColor = '#086189'; // IBM Blue 💙
const backgroundColor = '#EDF6FF';
const cardColor = '#ffffff';
const softShadow = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.1,
  shadowRadius: 6,
  elevation: 5,
};

const Home = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCars = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const userId = await AsyncStorage.getItem('userId');

      const res = await axios.get(`http:// 192.168.0.108:5000/vehicle/vehicles/${userId}?type=customer`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const carsFormatted = res.data.map(car => ({
        id: car.vehicle_id,
        name: `${car.make} ${car.model}`,
        year: car.year,
        engine: `${car.transmission?.toUpperCase()} | ${car.fuel_type?.toUpperCase()}`,
        isDefault: false,
      }));

      setCars(carsFormatted);
    } catch (err) {
      console.error('Error fetching cars:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');

        if (!token) {
          console.warn('No token found. User might not be logged in.');
          return;
        }

        console.log('🔐 accessToken:', token);

        const res = await axios.get('http://192.168.0.108:5000/myprofile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { first_name, last_name, profile_picture } = res.data.user;
        
        setFirstName(first_name);
        setLastName(last_name);
        setProfilePicture(profile_picture);
      } catch (error) {
        console.error('🚨 Error fetching profile:', error.message);
      }
    };

    fetchProfile();
    fetchCars();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.row}>
          <Image
            source={
              profilePicture
                ? { uri: profilePicture }
                : require('../../assets/avatar.jpg')
            }
            style={styles.avatar}
          />
          <View style={{ marginLeft: 16, flexShrink: 1 }}>
            <Text style={styles.title}>
              Welcome back, <Text style={styles.name}>{firstName} {lastName}</Text> 👋🏼
            </Text>
            <Text style={styles.subtext}>
              “It's a good day to take care of your ride.”
            </Text>
          </View>
        </View>
      </View>
      

    </SafeAreaView>
   

  );
};


export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
    paddingTop: 20,
  },
  card: {
    backgroundColor: cardColor,
    marginHorizontal: 16,
    marginVertical: 10,
    padding: 20,
    borderRadius: 20,
    borderLeftWidth: 5,
    borderLeftColor: primaryColor,
    ...softShadow,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: primaryColor,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: '#1C1C1E',
  },
  name: {
    fontWeight: '800',
    color: primaryColor,
  },
  subtext: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 4,
    fontStyle: 'italic',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 12, // Less spacing between title and card
  },
  
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: primaryColor,
  },
  
});
