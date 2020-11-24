import {StyleSheet, Dimensions} from 'react-native';

const width = Dimensions.get('window').width * 0.3;
export default StyleSheet.create({
  container: {
    margin: 5,
  },
  image: {
    height: width * 1.5,
    width,
    borderRadius: 5,
  },
  linear: {
    position: 'absolute',
    height: width * 1.5,
    width,
    borderRadius: 5,
  },
  subContainer: {
    position: 'absolute',
    height: width * 1.5,
    width,
    justifyContent: 'flex-end',
    padding: 5,
  },
  type: {
    color: 'rgba(255,255,255,.5)',
    fontSize: 9,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  tt: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 10,
    textTransform: 'uppercase',
  },
  last_title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 9,
    textTransform: 'uppercase',
  },
  time: {
    color: 'rgba(255,255,255,.5)',
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
