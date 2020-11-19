import {Dimensions, StyleSheet} from 'react-native';

const SIZE_WIDTH = Dimensions.get('window').width * 0.3;

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: SIZE_WIDTH * 1.5,
    width: SIZE_WIDTH,
    borderRadius: 5,
  },
  child: {
    padding: 10,
  },
  title: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  sinopsis: {
    color: '#fff',
    fontSize: 12,
  },
  author: {
    color: 'rgba(255,255,255,.5)',
    fontWeight: 'bold',
    fontSize: 12,
    marginRight: 10,
  },
  childTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
