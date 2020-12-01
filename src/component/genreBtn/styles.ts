import {Dimensions, StyleSheet} from 'react-native';

const width = Dimensions.get('window').width * 0.3;

export default StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  item: {
    height: 25,
    borderRadius: 5,
    width,
    margin: 2,
    alignItems: 'center',
    backgroundColor: '#333',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
  },
});
