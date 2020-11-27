import {Dimensions, StyleSheet} from 'react-native';

const {height, width} = Dimensions.get('window');

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
  bottom: {
    position: 'absolute',
    height: height * 0.95,
    width,
    justifyContent: 'flex-end',
  },
  bottomContainer: {
    backgroundColor: 'rgba(0,0,0,.5)',
    height: 35,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnBookmark: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleBookmark: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
