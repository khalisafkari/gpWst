import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');
export const SIZE_WIDTH = width * 0.3;
export default StyleSheet.create({
  container: {
    padding: 5.3,
  },
  historyView: {
    height: SIZE_WIDTH * 1.5,
    width: SIZE_WIDTH,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
  },
});
