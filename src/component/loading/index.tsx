import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import styles from './styles';

const Loading: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={25} color={'#fff'} />
    </View>
  );
};

export default Loading;
