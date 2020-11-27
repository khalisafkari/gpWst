import React, {useCallback, useEffect, useState} from 'react';
import {Pressable, View, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import FastImage from 'react-native-fast-image';
import styles from './styles';
import {Navigation} from 'react-native-navigation';
import dabatase from 'pixabay/database';

interface props {
  id: string;
  componentId: string;
  largeImageURL: string;
}

const PostsPixabay: React.FC<props> = (props) => {
  const [bookmark, setBookmark] = useState<boolean>(false);

  const onPress = () => {
    Navigation.pop(props.componentId);
  };

  useEffect(() => {
    dabatase.getBookmark(props.largeImageURL).then((results) => {
      if (results) {
        setBookmark(true);
      }
    });
  }, [props.largeImageURL]);

  const useBookmark = useCallback(() => {
    if (!bookmark) {
      dabatase.setBookmark(props.largeImageURL).then((results) => {
        setBookmark(results);
      });
    } else {
      dabatase.delBookmark(props.largeImageURL).then(() => {
        setBookmark(false);
      });
    }
  }, [bookmark, props.largeImageURL]);

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
      <View style={styles.bottom}>
        <Pressable onPress={useBookmark} style={styles.bottomContainer}>
          <Pressable onPress={useBookmark} style={styles.btnBookmark}>
            <Icon
              name={'book'}
              size={25}
              color={bookmark ? '#ff0000' : '#ffff'}
            />
            <Text
              style={[
                styles.titleBookmark,
                {
                  color: bookmark ? '#ff0000' : '#fff',
                },
              ]}>
              SAVE
            </Text>
          </Pressable>
        </Pressable>
      </View>
    </View>
  );
};

export default PostsPixabay;
