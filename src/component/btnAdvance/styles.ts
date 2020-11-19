import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    height: 50,
    margin: 5.5,
    borderRadius: 10,
    width: width * 0.97,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    margin: 5,
    height: 35,
    borderRadius: 5,
  },
  label: {
    color: '#fff',
    fontSize: 16,
  },
});
