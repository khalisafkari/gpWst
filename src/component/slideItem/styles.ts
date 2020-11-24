import {StyleSheet, Dimensions} from 'react-native';

export const SIZE_WIDTH = Dimensions.get('window').width * 0.72;

export default StyleSheet.create({
  container: {
    margin: 5,
  },
  image: {
    width: SIZE_WIDTH,
    height: SIZE_WIDTH * 0.6,
    borderRadius: 5,
  },
  linear: {
    position: 'absolute',
    width: SIZE_WIDTH,
    height: SIZE_WIDTH * 0.6,
    borderRadius: 5,
  },
  subContainer: {
    position: 'absolute',
    width: SIZE_WIDTH,
    height: SIZE_WIDTH * 0.6,
    justifyContent: 'flex-end',
    padding: 10,
  },
  type: {
    color: 'rgba(255,255,255,.5)',
    fontSize: 10.5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  tt: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  last_title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 9.5,
    textTransform: 'uppercase',
  },
  time: {
    color: 'rgba(255,255,255,.5)',
    fontSize: 8.5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
