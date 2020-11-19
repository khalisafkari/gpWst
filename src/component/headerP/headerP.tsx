import React from 'react';
import {Animated, Pressable, Text, View} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import {Navigation} from 'react-native-navigation';

interface props {
  animated: Animated.Value;
  componentId: string;
  isTitle: string;
  isSubtitle: string | '';
}

const HeaderP = (props: props) => {
  const translateY = props.animated.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -56],
  });

  const onBack = () => {
    Navigation.pop(props.componentId);
  };

  const isTitle = () => {
    if (props.isSubtitle != null) {
      // @ts-ignore
      return 'Chapter  ' + props.isSubtitle.match(/\d+/g).toString();
    }
  };

  return (
    <Animated.View style={[styles.container, {transform: [{translateY}]}]}>
      <Pressable style={styles.header} onPress={onBack}>
        <Icon name={'arrowleft'} size={30} color={'white'} />
      </Pressable>
      <View style={styles.child}>
        <Text numberOfLines={1} style={styles.title}>
          {props.isTitle}
        </Text>
        <Text style={styles.subtitle}>{isTitle()}</Text>
      </View>
    </Animated.View>
  );
};

export default HeaderP;
