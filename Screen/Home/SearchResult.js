import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import WorkshopCard from '../../Components/WorkshopCard/WorkshopCard';
import Colors from '../../Components/Colors/Colors';

const banners = [
  "https://www.steelcobuildings.com/wp-content/uploads/2024/06/AdobeStock_156266430_Preview-e1718286922289.jpeg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScjx6u5FKaBN0-ruxflRpLSztC_4Iuj73PDg&s",
  "https://www.steelcobuildings.com/wp-content/uploads/2024/06/AdobeStock_156266430_Preview-e1718286922289.jpeg",
];

const SearchResult = ({
  searchResults,
  isLoading,
  searchTerm,
  navigation,
  setSortModalVisible,
  setFilterModalVisible
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Search Results</Text>

        {!isLoading && (
          <View style={styles.headerButtons}>
            <TouchableOpacity style={styles.button} onPress={() => setSortModalVisible(true)}>
              <Ionicons name="swap-vertical-outline" size={16} color={Colors.darkGray} />
              <Text style={styles.buttonText}>Sort</Text>
            </TouchableOpacity>

            <View style={styles.separator} />

            <TouchableOpacity style={styles.button} onPress={() => setFilterModalVisible(true)}>
              <Ionicons name="filter-outline" size={16} color={Colors.darkGray} />
              <Text style={styles.buttonText}>Filter</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.line} />

      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      ) : searchResults.length > 0 ? (
        <ScrollView style={styles.scroll}>
          {searchResults.map((result) => (
            <WorkshopCard
              key={`result-${result.service_id}`}
              image={banners[Math.floor(Math.random() * banners.length)]}
              name={result.workshop_name}
              rating={result.rate}
              distance={2} // dummy
              price={result.price}
              onBookPress={() => navigation.navigate('Book', {
                serviceId: result.service_id,
                workshopName: result.workshop_name,
                price: result.price,
                image: result.image,
              })}
            />
          ))}
        </ScrollView>
      ) : (
        <View style={styles.noResults}>
          <Text style={styles.noResultsText}>No results found for "{searchTerm}"</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 8,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.black,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: Colors.lightGray,
    borderRadius: 10,
  },
  buttonText: {
    marginLeft: 4,
    color: Colors.darkGray,
    fontWeight: 'bold',
  },
  separator: {
    width: 1,
    height: 20,
    backgroundColor: Colors.lightGray,
  },
  line: {
    height: 1,
    backgroundColor: Colors.lightGray,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scroll: {
    flex: 1,
  },
  noResults: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 16,
    color: Colors.black,
  },
});

export default SearchResult;
