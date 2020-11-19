import React from 'react';
import {Pressable, Text, View} from 'react-native';
import Image from 'react-native-fast-image';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import {Navigation} from 'react-native-navigation';

interface props {
  item: {
    id: string;
    title: string;
    image: string;
    status: string;
    genre: Array<{
      id: string;
      title: string;
    }>;
  };
  componentId: string;
}

const ItemByGenre = (props: props) => {
  return (
    <Pressable
      onPress={() => {
        Navigation.push(props.componentId, {
          component: {
            name: 'com.bk2020.posts',
            passProps: {
              id: props.item.id,
              title: props.item.title,
              image: props.item.image,
            },
            options: {
              bottomTabs: {
                visible: false,
              },
              topBar: {
                title: {
                  text: props.item.title,
                },
              },
            },
          },
        });
      }}
      style={styles.container}>
      <Image source={{uri: props.item.image}} style={styles.image} />
      <LinearGradient colors={['transparent', 'black']} style={styles.linear} />
      <View style={styles.child}>
        <Text numberOfLines={2} style={styles.title}>
          {props.item.title}
        </Text>
      </View>
    </Pressable>
  );
};

export default ItemByGenre;
