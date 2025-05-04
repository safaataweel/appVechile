import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./WorkshopCardStyle";
import { Ionicons } from "@expo/vector-icons";

const WorkshopCard = ({
  image,
  serviceName,
  serviceDescription,
  workshopName,
  rating,
  distance,
  price,
  onBookPress,
  onCardPress,
}) => {

  // console.log("WorkshopCard props:", {
  //   image,
  //   serviceName,
  //   serviceDescription,
  //   workshopName,
  //   rating,
  //   distance,
  //   price,
  // });

  



  return (
    <TouchableOpacity style={styles.card} onPress={onCardPress}>
      <Image source={{ uri: image }} style={styles.image} />

      <View style={styles.info}>
        <View style={styles.topInfo}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
             {/* if the service name is long so we have a problem in card style */}
            <Text style={styles.serviceName} numberOfLines={1}>
              {serviceName}
            </Text>
          </View>
          <Text style={styles.price}>{price}₪</Text>
        </View>

       
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 4,
          }}
        >
          <Text style={styles.name} numberOfLines={1}>
            by {workshopName} ·
          </Text>
          <Ionicons name="star" size={12} color="#FFD700" />
          <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
        </View>
        <Text style={styles.serviceDescription} numberOfLines={2}>
          {serviceDescription}
        </Text>

        <View style={styles.bottomInfo}>
          <Text style={styles.distance}>{distance} km</Text>

          <TouchableOpacity style={styles.bookButton} onPress={onBookPress}>
            <Text style={styles.bookButtonText}>Book</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default WorkshopCard;
