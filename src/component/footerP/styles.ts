import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: 56,
    bottom: 0,
    backgroundColor: '#262b36',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  childContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  caretleft: {
    height: 56,
    width: 35,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  caretRight: {
    height: 56,
    width: 35,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  childLeft: {
    flex: 1,
    flexDirection: 'row',
  },
  report: {
    height: 56,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chat: {
    height: 56,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
