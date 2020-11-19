import {Dimensions, StyleSheet} from 'react-native';
const SIZE_WIDTH = Dimensions.get('window').width * 0.3;
export default StyleSheet.create({
  container: {
    margin: 5,
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
  },
  child: {
    position: 'absolute',
    width: SIZE_WIDTH,
    height: SIZE_WIDTH * 1.5,
    justifyContent: 'flex-end',
    padding: 5,
  },
  title: {
    color: '#fff',
  },
});
