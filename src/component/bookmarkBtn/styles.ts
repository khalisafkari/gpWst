import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    margin: 10,
    flexDirection: 'row',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    color: '#fff',
    fontWeight: 'bold',
  },
  author: {
    color: 'rgba(255,255,255,.5)',
    fontSize: 10,
  },
  btn: {
    justifyContent: 'center',
    width: 35,
    alignItems: 'flex-end',
  },
});
