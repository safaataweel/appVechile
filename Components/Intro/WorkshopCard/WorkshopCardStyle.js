import { StyleSheet } from 'react-native';
import Colors from '../../Colors/Colors';

export default StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    marginHorizontal: 20,
    paddingRight:10,
    borderWidth: 1,
    borderColor: Colors.mediumGray,
  },
  image: {
    width: 65,
    height: 65,
    borderRadius: 10,
    marginRight: 12,
  },
  details: {
   flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 15,
    color: Colors.black,
    marginBottom: 4,
  },
  rating: {
    color: Colors.orange,
    fontSize: 14,
    marginBottom: 2,
  },
  distance: {
    color: Colors.mediumGray,
    fontSize: 12,
  },
  side: {
     
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    
  },
  price: {
    fontWeight: 'bold',
    color: Colors.black,
    fontSize: 15,
    marginBottom: 6,
  },
  bookButton: {
    backgroundColor: Colors.lightgreen, // soft green
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingVertical: 3,
    // marginTop:8
  },
  bookText: {
    color: Colors.black,
    fontWeight: '600',
    fontSize: 14,
  },
});