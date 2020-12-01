import React, {useCallback} from 'react';
import {HomeResults} from 'westmanga-extensions';
import {Pressable, Text, View} from 'react-native';
import Image from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
import root from '@utils/navigation/root';
import styles from './styles';

interface props {
  componentId: string;
  item: HomeResults;
}
const Item: React.FC<props> = (props) => {
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
              text: props.item.boxinfo.tt,
            },
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
    <Pressable onPress={onPress} style={styles.container}>
      <Image
        source={{uri: props.item.image}}
        style={styles.image}
        resizeMode={Image.resizeMode.stretch}
      />
      <LinearGradient colors={['transparent', 'black']} style={styles.linear} />
      <View style={styles.subContainer}>
        <Text numberOfLines={1} style={styles.type}>
          {props.item.type}
        </Text>
        <Text style={styles.tt} numberOfLines={2}>
          {props.item.boxinfo.tt}
        </Text>
        <Text numberOfLines={1} style={styles.last_title}>
          <Icon name={'menuunfold'} color={'#fff'} size={10} />{' '}
          {props.item.fixyear.last_title}
        </Text>
        <Text numberOfLines={1} style={styles.time}>
          <Icon name={'clockcircle'} color={'#fff'} size={10} />{' '}
          {props.item.fixyear.time}
        </Text>
      </View>
    </Pressable>
  );
};

export default Item;
