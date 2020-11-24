import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    height: 50,
    width: 50,
  },
  version: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'rgba(255,255,255,.5)',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  desain: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'rgba(255,255,255,.5)',
    fontSize: 8,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  update: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    backgroundColor: '#333',
    margin: 10,
  },
});
