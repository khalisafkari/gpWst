import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');
const SIZE_WIDTH = width * 0.465;
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 5.3,
  },
  image: {
    height: SIZE_WIDTH,
    width: SIZE_WIDTH,
    borderRadius: 5,
  },
  linear: {
    top: 5,
    left: 5,
    position: 'absolute',
    height: SIZE_WIDTH,
    width: SIZE_WIDTH,
    borderRadius: 5,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titlePixabay: {
    color: 'rgba(255,255,255,.8)',
    fontWeight: 'bold',
    fontSize: 15,
    textTransform: 'lowercase',
    letterSpacing: 1.2,
  },
  subPixabay: {
    color: 'rgba(255,255,255,.5)',
    fontSize: 12,
    textAlign: 'center',
    letterSpacing: 1.2,
  },
  inputContainer: {
    position: 'absolute',
    height: 40,
    width: '97%',
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,.8)',
    margin: 5,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});
