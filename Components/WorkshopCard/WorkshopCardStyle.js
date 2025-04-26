import { StyleSheet } from 'react-native';
import Colors from '../../Components/Colors/Colors';

export default StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.lightGray,
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 10,
    backgroundColor: Colors.white,
    overflow: 'hidden',
    shadowColor: Colors.lightGray,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 3,
    elevation: 2,
  },
  image: {
    width: 90,
    height: 90,
    marginRight: 0,
  },
  info: {
    flex: 1,
    justifyContent: 'space-between',
    height: 90,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  topInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    //fontWeight: 'bold',
    color: Colors.black,
    //flex: 1,
   // marginRight: 5,
   
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.black,
    //marginRight: 15,
    
  },
  middleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  ratingText: {
    color: Colors.orange,
    fontSize: 14,
    marginLeft: 4,
  },
  bottomInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  distance: {
    fontSize: 14,
    color: Colors.darkGray,
  },
  bookButton: {
    backgroundColor: Colors.lightblue,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  bookButtonText: {
    color: Colors.black,
    fontWeight: 'bold',
    fontSize: 14,
  },
});
