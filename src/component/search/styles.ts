import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    margin: 5,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,.5)',
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
  },
  input: {
    flex: 1,
    color: '#fff',
  },
  btn: {
    height: 35,
    width: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    backgroundColor: 'rgba(255, 0, 0,1)',
    marginRight: 5,
  },
});
