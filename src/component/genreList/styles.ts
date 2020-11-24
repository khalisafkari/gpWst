import {Dimensions, StyleSheet} from 'react-native';

const width = Dimensions.get('window').width * 0.3;
export default StyleSheet.create({
  container: {
    margin: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    height: 30,
    width,
    margin: 2.6,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  title: {
    color: '#fff',
    fontSize: 12,
    textTransform: 'uppercase',
  },
});
