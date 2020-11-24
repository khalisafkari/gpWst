import {Dimensions, StyleSheet} from 'react-native';

export const SIZE_WIDTH = Dimensions.get('window').width * 0.3;

export default StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
  },
});
