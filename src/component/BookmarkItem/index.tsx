import React, {useCallback} from 'react';
import {Pressable, Text, View} from 'react-native';
import Image from 'react-native-fast-image';
import {allItem} from 'utils/database';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import root from 'utils/navigation/root';
import Icon from 'react-native-vector-icons/AntDesign';

interface props {
  componentId: string;
  item: allItem;
}

const BookmarkItem: React.FC<props> = (props) => {
  const onPress = useCallback(() => {
    const timeout = setTimeout(() => {
      root.push(props.componentId, {
        name: 'post',
        options: {
          bottomTabs: {
            visible: false,
          },
          topBar: {
            title: {
              text: props.item.title,
            },
            rightButtons: [
              {
                id: 'info-content',
                icon: Icon.getImageSourceSync('infocirlceo', 20),
              },
            ],
          },
        },
        passProps: {
          id: props.item.id,
          title: props.item.title,
          image: props.item.image,
        },
      });
    }, 100);
    return () => clearTimeout(timeout);
  }, [props.componentId, props.item.id, props.item.image, props.item.title]);

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image source={{uri: props.item.image}} style={styles.image} />
      <LinearGradient colors={['transparent', 'black']} style={styles.linear} />
      <View style={styles.subContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {props.item.title}
        </Text>
      </View>
    </Pressable>
  );
};

export default BookmarkItem;
