import React, { useRef, useEffect, useState } from "react";
import {Text, View, TextInput, TouchableOpacity, ScrollView, Image, Dimensions } from "react-native";
import styles from "./HomeStyle";
import { Ionicons } from "@expo/vector-icons";
import WorkshopCard from "../../Components/WorkshopCard/WorkshopCard";
import { config } from "../../config";
import axios from "axios";
import Colors from "../../Components/Colors/Colors";

import SearchResult from "./SearchResult";
import Filter from "./Filter";
import Sort from "./Sort";

const { width } = Dimensions.get("window");

const banners = [
  "https://www.steelcobuildings.com/wp-content/uploads/2024/06/AdobeStock_156266430_Preview-e1718286922289.jpeg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScjx6u5FKaBN0-ruxflRpLSztC_4Iuj73PDg&s",
  "https://www.steelcobuildings.com/wp-content/uploads/2024/06/AdobeStock_156266430_Preview-e1718286922289.jpeg",
];

const Home = ({ navigation }) => {
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedDistance, setSelectedDistance] = useState(null);
  const [mobileServiceOnly, setMobileServiceOnly] = useState(false);
  const [originalSearchResults, setOriginalSearchResults] = useState([]);
  const [selectedSortOption, setSelectedSortOption] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${config.apiUrl}/ServiceCategories/categories`);
        const dataWithColors = response.data.map((cat , index) => ({
          ...cat,
          color: index % 2 === 0 ? Colors.lightblue : Colors.mediumGray,//make one light blue then one dark blue 
        }));
        setCategories(dataWithColors);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % banners.length;
      setCurrentIndex(nextIndex);
      scrollRef.current?.scrollTo({
        x: nextIndex * (width - 60),
        animated: true,
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleSearch = async (text) => {
    setIsSearching(true);
    setSearchTerm(text);
    if (text.trim().length === 0) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.get(`${config.apiUrl}/search/search`, {
        params: { searchQuery: text },
      });
      setOriginalSearchResults(response.data);
      setSearchResults(response.data);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
    setIsSearching(false);
  };

  const sortResults = (results, sortOption) => {
    if (!sortOption) return results;
    const sorted = [...results];
    if (sortOption === "lowPrice") sorted.sort((a, b) => a.price - b.price);
    else if (sortOption === "highPrice") sorted.sort((a, b) => b.price - a.price);
    else if (sortOption === "highRating") sorted.sort((a, b) => b.rate - a.rate);
    else if (sortOption === "nearDistance") sorted.sort((a, b) => a.distance - b.distance);
    return sorted;
  };

  const applySort = (sortOption) => {
    const sorted = sortResults(searchResults, sortOption);
    setSearchResults(sorted);
    setSelectedSortOption(sortOption);
  };

  const applyFilters = () => {
    if (!selectedRating && !selectedDistance && !mobileServiceOnly) {
      setSearchResults(originalSearchResults);
      setFilterModalVisible(false);
      return;
    }

    let filtered = [...originalSearchResults];

    if (selectedRating) {
      filtered = filtered.filter((item) => item.rate >= selectedRating);
    }
    if (selectedDistance) {
      filtered = filtered.filter((item) => item.distance <= selectedDistance);
    }
    if (mobileServiceOnly) {
      filtered = filtered.filter((item) => item.mobile_service === true);
    }

    filtered = sortResults(filtered, selectedSortOption);

    setSearchResults(filtered);
    setFilterModalVisible(false);
  };

  const resetFilters = () => {
    setSelectedPrice(null);
    setSelectedRating(null);
    setSelectedDistance(null);
    setMobileServiceOnly(false);
    setSearchResults(originalSearchResults);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Anything..."
          placeholderTextColor="#999"
          value={searchTerm}
          onChangeText={setSearchTerm}
          onSubmitEditing={() => handleSearch(searchTerm)}
          returnKeyType="search"
        />
        {searchTerm.length > 0 && (
          <TouchableOpacity onPress={clearSearch}>
            <Ionicons name="close-circle" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      {!isSearching && (
        <ScrollView style={styles.scrollContent}>
          <ScrollView
            ref={scrollRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={styles.imageScroll}
          >
            {banners.map((img, index) => (
              <Image
                key={`banner-${index}`}
                source={{ uri: img }}
                style={styles.imageBanner}
              />
            ))}
          </ScrollView>

          <Text style={styles.sectionTitle}>Explore our Services</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryContent}
          >
            {categories.map((item) => (
              <TouchableOpacity
                key={`category-${item.category_id}`}
                style={[styles.categoryChip, { backgroundColor: item.color }]}
              >
                <Text style={styles.categoryText}>{item.category_name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.sectionTitle}>Categories</Text>
          {categories.map((item) => (
            <View key={`category-${item.category_id}`} style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 16, color: '#333' }}>{item.category_name}</Text>
            </View>
          ))}
        </ScrollView>
      )}

      {isSearching && (
        <SearchResult
          searchResults={searchResults}
          isLoading={isLoading}
          searchTerm={searchTerm}
          navigation={navigation}
          setSortModalVisible={setSortModalVisible}
          setFilterModalVisible={setFilterModalVisible}
        />
      )}

      <Filter
        visible={filterModalVisible}
        setVisible={setFilterModalVisible}
        applyFilters={applyFilters}
        resetFilters={resetFilters}
        selectedRating={selectedRating}
        selectedDistance={selectedDistance}
        mobileServiceOnly={mobileServiceOnly}
        setSelectedRating={setSelectedRating}
        setSelectedDistance={setSelectedDistance}
        setMobileServiceOnly={setMobileServiceOnly}
      />

      <Sort
        visible={sortModalVisible}
        setVisible={setSortModalVisible}
        applySort={applySort}
        setSelectedSortOption={setSelectedSortOption}
      />
    </View>
  );
};

export default Home;
