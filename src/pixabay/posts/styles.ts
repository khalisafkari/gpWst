import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
  },
  btn: {
    position: 'absolute',
    padding: 10,
    borderRadius: 50,
    backgroundColor: 'rgba(0,0,0,.5)',
    margin: 10,
  },
});
