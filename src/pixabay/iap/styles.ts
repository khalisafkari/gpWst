import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 56,
    alignItems: 'center',
    flexDirection: 'row',
  },
  btnClose: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
    margin: 10,
    borderRadius: 25,
  },
  titleHeader: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  center: {
    flex: 1,
  },
  containerTitleItem: {
    height: 56,
    margin: 10,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  containerTitleText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  conteinerDescriptionText: {
    color: 'rgba(255,255,255,.8)',
    fontWeight: 'bold',
    textTransform: 'lowercase',
    fontSize: 11.5,
  },
  containerItemDetail: {
    height: 250,
    margin: 10,
    backgroundColor: 'rgba(255,255,255,.85)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  containerItemDetailLabel: {
    color: '#000',
    fontSize: 15,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  footer: {
    margin: 10,
  },
  subscriptionDescription: {
    color: '#d7c9d7',
    textAlign: 'center',
    fontSize: 11.5,
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
  subscriptionPolicy: {
    color: 'blue',
  },
});
