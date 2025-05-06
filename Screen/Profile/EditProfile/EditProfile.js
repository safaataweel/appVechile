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

import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

import * as Location from "expo-location"; // Add the Location import
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

import styles from "./EditProfileStyle";
import { config } from "../../../config";
import Colors from "../../../Components/Colors/Colors";

const EditProfile = ({ navigation }) => {
  // State variables for clinet & profile data
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // just for mechanics
  const [userRole, setUserRole] = useState("");
  const [workshopName, setWorkshopName] = useState("");
  // Loading state for location
  const [loadingLocation, setLoadingLocation] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken");

        const response = await axios.get(`${config.apiUrl}/myprofile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { user, workshopDetails } = response.data;

        setFirstName(user.first_name);
        setLastName(user.last_name);
        setEmail(user.email_address);
        setPhone(user.phone_number);
        setAddress(user.address || ""); // Set address with fallback to empty string
        setImage(user.profile_picture);
        setUserRole(user.role);

        //console.log("data :", user.role);
        // If mechanic, set workshop details
        if (user.role === "Mechanic" && workshopDetails) {
          setWorkshopName(workshopDetails.workshop_name || "");
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
        Alert.alert("Error", "Failed to load profile info.");
      }
    };

    fetchUserProfile();
  }, []);

  // Handle get current location functionality
  // Handle get current location functionality
  const handleGetLocation = async () => {
    setLoadingLocation(true);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location permission not granted.");
        setLoadingLocation(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      const { latitude, longitude } = location.coords;
      console.log("Latitude:", latitude, "Longitude:", longitude);

      let road = "Unknown Street";
      let city = "Unknown City";

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
          {
            headers: {
              "User-Agent": "veeserv-app/1.0",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();

          // Extract address components from the response
          road = data.address?.road || data.address?.street || "Unknown Street";
          city =
            data.address?.city ||
            data.address?.town ||
            data.address?.village ||
            "Unknown City";
          const suburb = data.address?.suburb || "";
          const state = data.address?.state || "";
          const country = data.address?.country || "";

          console.log("Address data:", data.address);

          // Format a complete address string
          let formattedAddress = "";
          if (road) formattedAddress += road;
          if (suburb)
            formattedAddress += (formattedAddress ? ", " : "") + suburb;
          if (city) formattedAddress += (formattedAddress ? ", " : "") + city;
          if (state) formattedAddress += (formattedAddress ? ", " : "") + state;
          if (country)
            formattedAddress += (formattedAddress ? ", " : "") + country;

          // Set the address field with the formatted address
          setAddress(formattedAddress);

          // Show success toast or small notification
          // Alert.alert('Location Updated', 'Your current location has been added to the address field.');
        } else {
          console.warn("🌐 API response not OK, using fallback address.");
          setAddress("Address lookup failed");
        }
      } catch (apiError) {
        console.warn("🌐 API fetch failed:", apiError);
        setAddress("Location service unavailable");
      }
    } catch (error) {
      console.error("Location error:", error);
      Alert.alert("Error", `Could not get your location: ${error.message}`);
    } finally {
      setLoadingLocation(false);
    }
  };
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

      // Add mechanic-specific fields if the user is a mechanic
      if (userRole === "Mechanic") {
        payload.workshop_name = workshopName;
      }

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
        <Text
          style={{
            color: Colors.blue,
            marginBottom: 30,
            alignSelf: "center",
            fontSize: 14,
            fontWeight: "500",
          }}
        >
          Edit Profile Image
        </Text>
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        {/* Conditionally render Mechanic-specific fields */}
        {userRole === "Mechanic" && (
          <>
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Workshop Name</Text>
              <TextInput
                style={styles.input}
                value={workshopName}
                onChangeText={setWorkshopName}
                placeholder="Enter workshop name"
              />
            </View>
          </>
        )}
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

        <TouchableOpacity
          style={[
            {
              backgroundColor: loadingLocation ? "#f8f8f8" : "#ddd",
              paddingVertical: height * 0.015,
              borderRadius: width * 0.025,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
              opacity: loadingLocation ? 0.7 : 1,
              marginHorizontal: 10,
            },
          ]}
          onPress={handleGetLocation}
          disabled={loadingLocation}
        >
          <Text
            style={{
              color: Colors.black,
              fontWeight: "bold",
              fontSize: width * 0.035,
              marginRight: 8,
            }}
          >
            {loadingLocation
              ? "Getting Location..."
              : "Use My Current Location"}
          </Text>
          <Ionicons name="location" size={width * 0.04} color={Colors.blue} />
        </TouchableOpacity>
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
