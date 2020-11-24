import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');
export const SIZE_WIDTH = width * 0.7;
export default StyleSheet.create({
  containerFlat: {
    paddingBottom: 20,
    paddingHorizontal: 15,
  },
});
