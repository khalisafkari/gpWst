import React from 'react';
import {
  ActivityIndicator,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import styles from './styles';

interface props {
  title?: string;
  style?: StyleProp<ViewStyle>;
}

const Loading = (props: props) => {
  return (
    <View style={[styles.container, props.style]}>
      <ActivityIndicator color={'#fff'} size={25} />
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
};

export default Loading;
