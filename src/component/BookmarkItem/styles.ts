import {Dimensions, StyleSheet} from 'react-native';

const SIZE_WIDTH = Dimensions.get('window').width * 0.3;

export default StyleSheet.create({
  container: {
    margin: 5,
  },
  image: {
    height: SIZE_WIDTH * 1.5,
    width: SIZE_WIDTH,
    borderRadius: 5,
  },
  linear: {
    position: 'absolute',
    height: SIZE_WIDTH * 1.5,
    width: SIZE_WIDTH,
    borderRadius: 5,
  },
  subContainer: {
    position: 'absolute',
    height: SIZE_WIDTH * 1.5,
    width: SIZE_WIDTH,
    justifyContent: 'flex-end',
    padding: 5,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 10,
    textTransform: 'uppercase',
  },
});
