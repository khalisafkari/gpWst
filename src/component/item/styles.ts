import {Dimensions, StyleSheet} from 'react-native';

export const SIZE_WIDTH = Dimensions.get('window').width * 0.3;

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
    height: SIZE_WIDTH * 1.5,
    width: SIZE_WIDTH,
    justifyContent: 'flex-end',
    padding: 5,
  },
  title: {
    color: '#fff',
  },
  type: {
    color: '#fff',
    fontSize: 10,
  },
});
