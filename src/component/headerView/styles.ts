import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: 56,
    backgroundColor: '#262b36',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  child: {
    flex: 1,
  },
  title: {
    marginHorizontal: 10,
    color: 'white',
    fontSize: 15,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  subtitle: {
    marginHorizontal: 10,
    color: 'white',
    fontSize: 10,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});
