import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');
const SIZE_WIDTH = width * 0.465;
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unlock: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  item: {
    margin: 5,
  },
  image: {
    height: SIZE_WIDTH,
    width: SIZE_WIDTH,
    borderRadius: 5,
  },
  linear: {
    position: 'absolute',
    height: SIZE_WIDTH,
    width: SIZE_WIDTH,
    borderRadius: 5,
  },
});
