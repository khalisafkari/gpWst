import {Dimensions, StyleSheet} from 'react-native';

const width = Dimensions.get('window').width * 0.95;

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {
    position: 'absolute',
    bottom: 0,
    height: 40,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#ff0000',
    alignItems: 'center',
    justifyContent: 'center',
    width,
  },
  btnTitle: {
    color: '#fff',
    fontSize: 15,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});
