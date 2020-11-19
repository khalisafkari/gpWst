import {StyleSheet, Dimensions} from 'react-native';

export const SIZE_WIDTH = Dimensions.get('window').width * 0.72;
export default StyleSheet.create({
  scrollContainer: {
    paddingBottom: '10%',
    paddingHorizontal: '10%',
  },
  container: {
    paddingHorizontal: 3,
  },
  image: {
    width: SIZE_WIDTH,
    height: SIZE_WIDTH * 0.6,
    borderRadius: 10,
  },
  linear: {
    position: 'absolute',
    width: SIZE_WIDTH,
    top: 1,
    height: SIZE_WIDTH * 0.6,
    borderRadius: 10,
    left: 3,
  },
  subItem: {
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    width: SIZE_WIDTH,
    height: SIZE_WIDTH * 0.6,
  },
  title: {
    color: '#fff',
  },
  type: {
    color: '#fff',
    fontSize: 10,
  },
  botChild: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
