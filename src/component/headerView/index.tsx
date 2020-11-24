import React, {useCallback} from 'react';
import {Animated, Text, View, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Navigation} from 'react-native-navigation';
import styles from './styles';

interface props {
  componentId: string;
  title: string;
  scrollY: Animated.Value;
  subtitle?: string | null;
}

const HeaderView: React.FC<props> = (props) => {
  const translateY = props.scrollY.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -56],
  });

  const onBack = useCallback(() => {
    const timeout = setTimeout(() => {
      Navigation.pop(props.componentId);
    }, 100);
    return () => clearTimeout(timeout);
  }, [props.componentId]);

  const subTitle = useCallback(() => {
    if (props.subtitle !== null) {
      // @ts-ignore
      return 'Chapter ' + props.subtitle?.match(/\d+/g).toString();
    }
    return '';
  }, [props.subtitle]);

  return (
    <Animated.View style={[styles.container, {transform: [{translateY}]}]}>
      <Pressable style={styles.header} onPress={onBack}>
        <Icon name={'arrowleft'} size={20} color={'white'} />
      </Pressable>
      <View style={styles.child}>
        <Text numberOfLines={1} style={styles.title}>
          {props.title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {subTitle()}
        </Text>
      </View>
    </Animated.View>
  );
};

export default HeaderView;
