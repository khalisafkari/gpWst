import React from 'react';
import {StyleSheet, View} from 'react-native';
import Image from 'react-native-fast-image';
import styles from './styles';

interface props {
  url: string;
  componentId: string;
}

const FullImage: React.FC<props> = (props) => {
  return (
    <View nativeID={props.componentId} style={styles.container}>
      <Image
        resizeMode={Image.resizeMode.cover}
        source={{uri: props.url}}
        style={[StyleSheet.absoluteFill]}
      />
    </View>
  );
};

export default FullImage;
