import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator
} from 'react-native';
import styles from './EditProfileStyle';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // assuming token is stored here
import { useEffect } from 'react';

const EditProfile = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [email, setEmail] = useState('');
const [phone, setPhone] = useState('');
const [image, setImage] = useState(null);
const [loading, setLoading] = useState(false);

useEffect(() => {
  const fetchUserProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');

      const response = await axios.get('http://172.19.20.117:5000/myprofile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { user } = response.data;

      setFirstName(user.first_name);
      setLastName(user.last_name);
      setEmail(user.email_address);
      setPhone(user.phone_number);
      setImage(user.profile_picture); // existing image if any
    } catch (err) {
      console.error('Error fetching user profile:', err);
      Alert.alert('Error', 'Failed to load profile info.');
    }
  };

  fetchUserProfile();
}, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true, // 👈 useful if you want to send image directly
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      setImage(asset.uri);
      // optionally: set base64 for backend if needed
      // setImage(`data:image/jpeg;base64,${asset.base64}`);
    }
  };

  const handleSave = async () => {
    setLoading(true);

    try {
      const token = await AsyncStorage.getItem('accessToken'); // ✅ consistent with other fetch


      const payload = {
        first_name: firstName,
        last_name: lastName,
        email_address: email,
        phone_number: phone,
        profile_picture: image, // could send base64 or URL
      };

      const response = await axios.put('http://172.19.20.117:5000/profile/edit', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('✅ Profile update response:', response.data);
      Alert.alert('Success', 'Profile updated!');
      navigation.goBack();
    } catch (error) {
      console.error('❌ Failed to update profile:', error.response?.data || error.message);
      Alert.alert('Error', 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        {image ? (
          <Image source={{ uri: image }} style={styles.avatar} />
        ) : (
          <View style={styles.placeholderImage}>
            <Ionicons name="camera" size={30} color="#888" />
            <Text style={styles.imageText}>Choose Image</Text>
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
        />

        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
      </View>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSave}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveButtonText}>Save Changes</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditProfile;
