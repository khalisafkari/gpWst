import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {HomeResults} from 'westmanga-extensions';
import Image from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './styles';
import {Navigation} from 'react-native-navigation';

interface props {
  item: HomeResults;
  componentId: string;
}

const Item = (props: props) => {
  return (
    <Pressable
      onPress={() => {
        Navigation.push(props.componentId, {
          component: {
            name: 'com.bk2020.posts',
            passProps: {
              id: props.item.id,
              title: props.item.boxinfo.tt,
              image: props.item.image,
            },
            options: {
              topBar: {
                title: {
                  text: props.item.boxinfo.tt,
                },
              },
              bottomTabs: {
                visible: false,
              },
            },
          },
        });
      }}
      style={styles.container}>
      <Image style={styles.image} source={{uri: props.item.image}} />
      <LinearGradient colors={['transparent', 'black']} style={styles.linear} />
      <View style={styles.child}>
        <Text style={styles.title} numberOfLines={1}>
          {props.item.boxinfo.tt}
        </Text>
        <Text style={styles.type}>
          <Icon name={'clockcircle'} size={10} color={'#fff'} />{' '}
          {props.item.fixyear.time}
        </Text>
        <Text style={styles.type}>
          <Icon name={'book'} size={10} color={'#fff'} /> {props.item.type}
        </Text>
        <Text style={styles.type}>
          <Icon name={'bars'} size={10} color={'#fff'} />{' '}
          {props.item.fixyear.last_title}
        </Text>
      </View>
    </Pressable>
  );
};

export default Item;
