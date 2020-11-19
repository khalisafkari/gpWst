import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    position: 'absolute',
    backgroundColor: 'red',
    height: 2,
    top: 56,
  },
});
export {width};
