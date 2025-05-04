import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import styles from "./EditProfileStyle";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { config } from "../../config";
import Colors from "../../Components/Colors/Colors";

const EditProfile = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState(""); // New state for address
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken");

        const response = await axios.get(`${config.apiUrl}/myprofile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { user } = response.data;

        setFirstName(user.first_name);
        setLastName(user.last_name);
        setEmail(user.email_address);
        setPhone(user.phone_number);
        setAddress(user.address || ""); // Set address with fallback to empty string
        setImage(user.profile_picture);
      } catch (err) {
        console.error("Error fetching user profile:", err);
        Alert.alert("Error", "Failed to load profile info.");
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
      base64: true,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      setImage(asset.uri);
    }
  };

  const handleSave = async () => {
    setLoading(true);

    try {
      const token = await AsyncStorage.getItem("accessToken");

      const payload = {
        first_name: firstName,
        last_name: lastName,
        email_address: email,
        phone_number: phone,
        address: address, // Include address in payload
        profile_picture: image,
      };

      const response = await axios.put(
        `${config.apiUrl}/profile/edit`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ Profile update response:", response.data);
      Alert.alert("Success", "Profile updated!");
      navigation.goBack();
    } catch (error) {
      console.error(
        "❌ Failed to update profile:",
        error.response?.data || error.message
      );
      Alert.alert("Error", "Something went wrong!");
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

      <TouchableOpacity onPress={pickImage}>
        <Text style={{ 
          color: Colors.blue, 
          marginBottom: 30, 
          alignSelf: 'center',
          fontSize: 14,
          fontWeight: '500'
        }}>
          Edit Profile Image
        </Text>
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
            placeholder="Enter your first name"
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
            placeholder="Enter your last name"
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholder="Enter your email"
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            placeholder="Enter your phone number"
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            placeholder="Enter your address"
          />
        </View>
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