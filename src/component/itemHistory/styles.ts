import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');
const SIZE_WIDTH = width * 0.3;
export default StyleSheet.create({
  container: {
    padding: 5.3,
  },
  image: {
    width: SIZE_WIDTH,
    height: SIZE_WIDTH * 1.5,
    borderRadius: 5,
  },
  linear: {
    position: 'absolute',
    width: SIZE_WIDTH,
    height: SIZE_WIDTH * 1.5,
    borderRadius: 5,
    top: 5,
    left: 5,
  },
  child: {
    position: 'absolute',
    width: SIZE_WIDTH,
    height: SIZE_WIDTH * 1.5,
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
  },
  title: {
    color: '#fff',
  },
  last_title: {
    color: '#fff',
    fontSize: 10,
  },
});
