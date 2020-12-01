import React, {useCallback} from 'react';
import {HomeResults} from 'westmanga-extensions';
import {Animated, Pressable as P, Text, View} from 'react-native';
import Image from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
import styles, {SIZE_WIDTH} from './styles';
import root from 'utils/navigation/root';

interface props {
  componentId: string;
  item: HomeResults;
  scrollX: Animated.Value;
  index: number;
}

const Pressable = Animated.createAnimatedComponent(P);

const SlideItem: React.FC<props> = (props) => {
  const inputRange = [
    (props.index - 2) * SIZE_WIDTH + 10.6,
    props.index * SIZE_WIDTH + 10.6,
    (props.index + 2) * SIZE_WIDTH + 10.6,
  ];
  const translateY = props.scrollX.interpolate({
    inputRange,
    outputRange: [25, 10, 25],
  });

  const onPress = useCallback(() => {
    const timeout = setTimeout(() => {
      root.push(props.componentId, {
        name: 'post',
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
        passProps: {
          id: props.item.id,
          title: props.item.boxinfo.tt,
          image: props.item.image,
        },
      });
    }, 100);

    return () => clearTimeout(timeout);
  }, [
    props.componentId,
    props.item.boxinfo.tt,
    props.item.id,
    props.item.image,
  ]);

  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, {transform: [{translateY}]}]}>
      <Image
        resizeMode={Image.resizeMode.cover}
        source={{uri: props.item.image}}
        style={styles.image}
      />
      <LinearGradient colors={['transparent', 'black']} style={styles.linear} />
      <View style={styles.subContainer}>
        <Text style={styles.type}>{props.item.type}</Text>
        <Text style={styles.tt}>{props.item.boxinfo.tt}</Text>
        <Text style={styles.last_title}>
          <Icon name={'menuunfold'} color={'#fff'} size={10} />{' '}
          {props.item.fixyear.last_title}
        </Text>
        <Text style={styles.time}>
          <Icon name={'clockcircle'} color={'#fff'} size={10} />{' '}
          {props.item.fixyear.time}
        </Text>
      </View>
    </Pressable>
  );
};

export default SlideItem;
