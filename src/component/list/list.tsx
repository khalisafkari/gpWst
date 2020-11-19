import React from 'react';
import {Animated, Pressable as Touch, Text, View} from 'react-native';
import {HomeResults} from 'westmanga-extensions';
import Image from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './styles';
import {Navigation} from 'react-native-navigation';

interface props {
  list: HomeResults[];
  componentId: string;
}

const Pressable = Animated.createAnimatedComponent(Touch);

const List = (props: props) => {
  const renderItem = React.useCallback(
    (item: HomeResults, index: number) => {
      return (
        <Pressable
          onPress={() => {
            Navigation.push(props.componentId, {
              component: {
                name: 'com.bk2020.posts',
                passProps: {
                  id: item.id,
                  title: item.boxinfo.tt,
                  image: item.image,
                },
                options: {
                  topBar: {
                    title: {
                      text: item.boxinfo.tt,
                    },
                  },
                  bottomTabs: {
                    visible: false,
                  },
                },
              },
            });
          }}
          style={[styles.itemContainer]}
          key={index}>
          <Image source={{uri: item.image}} style={styles.image} />
          <LinearGradient
            colors={['transparent', 'black']}
            style={styles.linear}
          />
          <View style={styles.botChild}>
            <Text style={styles.title} numberOfLines={1}>
              {item.boxinfo.tt}
            </Text>
            <Text style={styles.type}>
              <Icon name={'clockcircle'} size={10} color={'#fff'} />{' '}
              {item.fixyear.time}
            </Text>
            <Text style={styles.type}>
              <Icon name={'book'} size={10} color={'#fff'} /> {item.type}
            </Text>
            <Text style={styles.type}>
              <Icon name={'bars'} size={10} color={'#fff'} />{' '}
              {item.fixyear.last_title}
            </Text>
          </View>
        </Pressable>
      );
    },
    [props.componentId],
  );

  return (
    <View style={styles.viewContainer}>
      <View style={styles.container}>{props.list.map(renderItem)}</View>
    </View>
  );
};

export default List;
