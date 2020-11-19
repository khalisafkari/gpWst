import React from 'react';
import {Pressable, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import FastImage from 'react-native-fast-image';
import styles from './styles';
import {Navigation} from 'react-native-navigation';

const PostsPixabay = (props: any) => {
  const onPress = () => {
    Navigation.pop(props.componentId);
  };

  React.useEffect(() => {
    Navigation.mergeOptions(props.componentId, {
      statusBar: {
        visible: false,
        translucent: false,
      },
    });
  }, [props.componentId]);

  return (
    <View nativeID={`image${props.id}Dest`} style={styles.container}>
      <FastImage source={{uri: props.largeImageURL}} style={styles.image} />
      <Pressable onPress={onPress} style={styles.btn}>
        <Icon name={'close'} size={30} color={'white'} />
      </Pressable>
    </View>
  );
};

export default PostsPixabay;
