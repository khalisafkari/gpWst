import React from 'react';
import {Pressable, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import FastImage from 'react-native-fast-image';
import styles from './styles';
import {Navigation} from 'react-native-navigation';

const PostsPixabay = (props: any) => {
  const onPress = () => {
    Navigation.pop(props.componentId);
  };

  return (
    <View nativeID={`image${props.id}Dest`} style={styles.container}>
      <FastImage
        resizeMode={FastImage.resizeMode.contain}
        source={{uri: props.largeImageURL}}
        style={StyleSheet.absoluteFill}
      />
      <Pressable onPress={onPress} style={styles.btn}>
        <Icon name={'close'} size={30} color={'white'} />
      </Pressable>
    </View>
  );
};

export default PostsPixabay;
