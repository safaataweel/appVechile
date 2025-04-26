import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../Components/Colors/Colors';

const { width } = Dimensions.get('window');

// this insted of add padding to the container
const PADDING = 20;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 20,
    marginHorizontal: 20,
    height: 44,
    marginTop: width * 0.13,
    zIndex: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  scrollContent: {
    flex: 1,
  },
  searchResultsContainer: {
    flex: 1,
    //paddingHorizontal: 20,
    paddingTop: 10,

    
  },
  searchResultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    //marginBottom: 15,
    color: Colors.black,
   // marginHorizontal: PADDING,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //paddingTop: 50,
  },
  noResultsText: {
    fontSize: 16,
    color: Colors.black,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //paddingTop: 50,
  },

  imageScroll: {
    paddingHorizontal: PADDING,
    marginBottom: 20
  },
  imageBanner: {
    width: width - 70,
    height: 160,
    borderRadius: 12,
    marginLeft: 10,
  },


  banner: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    marginBottom: 20,
    marginHorizontal: PADDING,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 10,
    marginHorizontal: 20,
  },

  categoryContent: {
    flexDirection: 'row',
    marginLeft: 20,
    marginBottom: 24,
    gap: 10,

  },
  categoryChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,

  },
  categoryText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 15,
  },

  searchResultsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: PADDING,
    marginBottom: 8,
  },

  headerButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  verticalSeparator: {
    height: 20,
    width: 1,
    backgroundColor: Colors.lightGray,
  },

  horizontalSeparator: {
    height: 1,
    backgroundColor: Colors.lightGray,
    marginHorizontal: PADDING,
    marginVertical: 10,
  },

  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: Colors.lightGray,
    borderRadius: 10,
  },

  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: Colors.lightGray,
    borderRadius: 10,
  },

  filterButtonText: {
    marginLeft: 4,
    color: '#086189',
    fontWeight: 'bold',
  },

  sortButtonText: {
    marginLeft: 4,
    color: '#086189',
    fontWeight: 'bold',
  },

  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
    backgroundColor: '#086189',  // Change this color to whatever you like for the area under the filter button


  },
  modalContent: {
    height: 600,                     // Bigger to fit all filters
    backgroundColor: Colors.lightblue,     // Background of the WHOLE filter panel
    padding: 20,
    paddingTop: 70,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: Colors.lightblue, // 🌈 your desired background color here
  },
  modalTitle: {
    marginTop: 70,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  applyButton: {
    marginTop: 10,
    backgroundColor: '#086189',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    Size: 100,
    width: '100%',
    height: 50,

  },
  applyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  filterOption: {
    padding: 15,
    margin: 4,
    marginTop: 15,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#fff',
    color: '#333',
    backgroundColor: "white", // Make sure this is not transparent!
    height: 45,

  }
  ,
  selectedOption: {
    backgroundColor: '#007bff',
    color: '#fff',
    borderColor: '#007bff',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  filterLabel: {
    fontWeight: 'bold',
    marginBottom: 6,
    fontcolor: 'blue',
  },
  filterSection: {
    marginBottom: 20, // spacing between filter groups
  },
  chipGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    backgroundColor: Colors.lightblue,

  },
  chipGroupContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.lightblue, // light background for under the chips
    marginBottom: 12,
  },
});