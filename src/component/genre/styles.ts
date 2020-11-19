import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  btn: {
    padding: 5,
    width: width * 0.315,
    margin: 2.5,
    borderRadius: 5,
  },
  title: {
    color: '#fff',
    textTransform: 'capitalize',
  },
});
