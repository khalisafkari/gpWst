import {Dimensions, StyleSheet} from 'react-native';

const width = Dimensions.get('window').width * 0.3;
export default StyleSheet.create({
  // containerImage: {
  //   alignItems: 'center',
  //   margin: 10,
  // },
  // image: {
  //   height: width * 1.5,
  //   width: width,
  //   borderRadius: 10,
  // },
  // linear: {
  //   position: 'absolute',
  //   height: width * 1.5,
  //   width: width,
  //   borderRadius: 10,
  // },
  // title_jp: {
  //   color: '#fff',
  //   fontSize: 10,
  //   marginVertical: 10,
  // },
  // description: {
  //   fontSize: 12,
  //   color: '#fff',
  // },
  // boxInfo: {
  //   marginHorizontal: 10,
  // },
  container: {
    margin: 10,
    alignItems: 'center',
  },
  image: {
    height: width * 1.35,
    width: width * 0.95,
    borderRadius: 5,
  },
  subContainer: {
    margin: 10,
  },
  total: {
    color: 'rgba(255,255,255,.5)',
    textTransform: 'uppercase',
    fontSize: 10,
  },
  containerSynopsis: {
    marginBottom: 5,
  },
  sinopsis: {
    color: '#fff',
    fontSize: 12,
  },
  color: {
    color: 'blue',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 12,
  },
});
