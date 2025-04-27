import React, { useRef, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  ActivityIndicator,
  Switch,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import styles from "./HomeStyle";
import { Ionicons } from "@expo/vector-icons";
import WorkshopCard from "../../Components/WorkshopCard/WorkshopCard";
import axios from "axios";
import { config } from "../../config"; // for API URL
import Colors from "../../Components/Colors/Colors";
const { width } = Dimensions.get("window");

const categoryColors = [
  "#FF9149",
  "#27548A",
  "#60B5FF",
  "#E9A5F1",
  "#578FCA",
  "#7E99A3",
  "#FFC857",
  "#6A0572",
  "#38A3A5",
  "#F26419",
  "#F9C74F",
  "#90BE6D",
  "#F3722C",
  "#F8961E",
  "#F9C74F",
];

// this is the list of random images
// latter we can do a function to get the images from the server

const banners = [
  "https://www.steelcobuildings.com/wp-content/uploads/2024/06/AdobeStock_156266430_Preview-e1718286922289.jpeg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScjx6u5FKaBN0-ruxflRpLSztC_4Iuj73PDg&s",
  "https://www.steelcobuildings.com/wp-content/uploads/2024/06/AdobeStock_156266430_Preview-e1718286922289.jpeg",
];

const Home = () => {
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(null); // 'low' | 'high'
  const [selectedRating, setSelectedRating] = useState(null); // 1 - 5
  const [selectedDistance, setSelectedDistance] = useState(null); // e.g., 5 km
  const [mobileServiceOnly, setMobileServiceOnly] = useState(false);
  const [originalSearchResults, setOriginalSearchResults] = useState([]); // To store unfiltered results
  const [selectedSortOption, setSelectedSortOption] = useState(null);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${config.apiUrl}/ServiceCategories/categories`
        );
        const dataWithColors = response.data.map((cat) => ({
          ...cat,
          color:
            categoryColors[Math.floor(Math.random() * categoryColors.length)],
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
      setSearchResults(response.data); // Initialize with full search results
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
    if (sortOption === "lowPrice") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortOption === "highPrice") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortOption === "highRating") {
      sorted.sort((a, b) => b.rate - a.rate);
    } else if (sortOption === "nearDistance") {
      sorted.sort((a, b) => a.distance - b.distance);
    }
    return sorted;
  };

  const applySort = (sortOption) => {
    const sorted = sortResults(searchResults, sortOption);
    setSearchResults(sorted);
    setSelectedSortOption(sortOption);
  };

  const applyFilters = () => {
    // If all filters are null, show all results
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

    // Apply current sort to filtered results
    filtered = sortResults(filtered, selectedSortOption);

    setSearchResults(filtered);
    setFilterModalVisible(false);
  };

  const FilterChip = ({ label, selected, onPress }) => (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 20,
          marginRight: 8,
          marginBottom: 8,
          minWidth: 70,
          height: 40,
          backgroundColor: selected ? Colors.blue : Colors.lightGray,
          justifyContent: "center",
          alignItems: "center",
        },
      ]}
    >
      <Text style={{ color: selected ? "#fff" : "#333", fontWeight: "500" }}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const resetFilters = () => {
    setSelectedPrice(null);
    setSelectedRating(null);
    setSelectedDistance(null);
    setMobileServiceOnly(false);
    setSearchResults(originalSearchResults); // reset to unfiltered data
  };

  return (
    <View style={styles.container}>
      {/* Home Screen */}
      {/* Search Input */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#999"
          style={styles.searchIcon}
        />
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

      {/* Banner */}
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

      {/* Search Result Screen */}
      {/* Search Results */}
      {isSearching && (
        <View style={styles.searchResultsContainer}>
          <View style={styles.searchResultsHeader}>
            <Text style={styles.searchResultsTitle}>Search Results</Text>

            {!isLoading && (
              <View style={styles.headerButtonsContainer}>
                <TouchableOpacity
                  style={styles.sortButton}
                  onPress={() => setSortModalVisible(true)} // يفتح المودال
                >
                  <Ionicons name="swap-vertical-outline" size={16} color={Colors.darkGray} />
                  <Text style={styles.sortButtonText}>Sort</Text>
                </TouchableOpacity>


                <View style={styles.verticalSeparator} />

                <TouchableOpacity
                  style={styles.filterButton}
                  onPress={() => setFilterModalVisible(true)}
                >
                  <Ionicons name="filter-outline" color={Colors.darkGray} />
                  <Text style={styles.filterButtonText}>Filter</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={styles.horizontalSeparator} />

          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#000" />
            </View>
          ) : searchResults.length > 0 ? (
            <ScrollView style={styles.searchResultsScroll}>
              {searchResults.map((result) => (
                <WorkshopCard
                  key={`result-${result.service_id}`}
                  image={banners[Math.floor(Math.random() * banners.length)]}
                  name={result.workshop_name}
                  rating={result.rate}
                  distance={2}
                  price={result.price}
                  onPress={() => console.log(`Navigate to ${result.workshop_name}`)}
                />
              ))}
            </ScrollView>
          ) : (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>
                No results found for "{searchTerm}"
              </Text>
            </View>
          )}
        </View>
      )}


    {/* Filter Modal */}
<Modal
  visible={filterModalVisible}
  transparent
  animationType="slide"
  onRequestClose={() => setFilterModalVisible(false)}
>
  <TouchableWithoutFeedback onPress={() => setFilterModalVisible(false)}>
    <View style={styles.modalOverlay}>
      <TouchableWithoutFeedback>
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>Filter Options</Text>

          <Text style={styles.filterLabel}>Minimum Rating</Text>
          <View style={styles.chipGroup}>
            {[1, 2, 3, 4, 5].map((rate) => (
              <FilterChip
                key={`rating-${rate}`}
                label={`${rate}★`}
                selected={selectedRating === rate}
                onPress={() => {
                  if (selectedRating === rate) {
                    setSelectedRating(null);
                  } else {
                    setSelectedRating(rate);
                  }
                }}
              />
            ))}
          </View>

          <Text style={styles.filterLabel}>Within Distance (km)</Text>
          <View style={styles.chipGroup}>
            {[2, 5, 10, 20].map((dist) => (
              <FilterChip
                key={`dist-${dist}`}
                label={`${dist} km`}
                selected={selectedDistance === dist}
                onPress={() => {
                  if (selectedDistance === dist) {
                    setSelectedDistance(null);
                  } else {
                    setSelectedDistance(dist);
                  }
                }}
              />
            ))}
          </View>

          <View style={styles.switchRow}>
            <Text style={styles.filterLabel}>Mobile Service Only</Text>
            <Switch value={mobileServiceOnly} onValueChange={setMobileServiceOnly} />
          </View>

          <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </View>
  </TouchableWithoutFeedback>
</Modal>

      {/* Sort Modal */}
      <Modal
        visible={sortModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setSortModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setSortModalVisible(false)}>
          <View style={styles.sortModalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.sortModalCard}>
                <Text style={styles.sortModalTitle}>Sort by</Text>

                <View style={styles.sortOptionsContainer}>
                  <TouchableOpacity style={styles.sortOptionButton} onPress={() => { setSelectedSortOption('lowPrice'); applySort('lowPrice'); setSortModalVisible(false); }}>
                    <Text style={styles.sortOptionText}>Price: Low to High</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.sortOptionButton} onPress={() => { setSelectedSortOption('highPrice'); applySort('highPrice'); setSortModalVisible(false); }}>
                    <Text style={styles.sortOptionText}>Price: High to Low</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.sortOptionButton} onPress={() => { setSelectedSortOption('highRating'); applySort('highRating'); setSortModalVisible(false); }}>
                    <Text style={styles.sortOptionText}>Highest Rating</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.sortOptionButton} onPress={() => { setSelectedSortOption('nearDistance'); applySort('nearDistance'); setSortModalVisible(false); }}>
                    <Text style={styles.sortOptionText}>Closest Distance</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>



    </View>
  );
};
export default Home;