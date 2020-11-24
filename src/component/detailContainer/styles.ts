import {Dimensions, StyleSheet} from 'react-native';

const width = Dimensions.get('window').width * 0.4;
export default StyleSheet.create({
  containerImage: {
    alignItems: 'center',
    margin: 10,
  },
  image: {
    height: width * 1.5,
    width: width,
    borderRadius: 10,
  },
  linear: {
    position: 'absolute',
    height: width * 1.5,
    width: width,
    borderRadius: 10,
  },
  title_jp: {
    color: '#fff',
    fontSize: 10,
    marginVertical: 10,
  },
  description: {
    fontSize: 12,
    color: '#fff',
  },
  boxInfo: {
    marginHorizontal: 10,
  },
});
