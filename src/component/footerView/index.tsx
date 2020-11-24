import React from 'react';
import {Animated, View, Pressable, GestureResponderEvent} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './styles';

interface props {
  scrollY: Animated.Value;
  next?: {
    onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
    disable?: boolean;
  };
  prev?: {
    onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
    disable?: boolean;
  };
}

const FooterView: React.FC<props> = (props) => {
  const translateY = props.scrollY.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 56],
  });

  return (
    <Animated.View style={[styles.container, {transform: [{translateY}]}]}>
      <View style={styles.childLeft}>
        <Pressable style={styles.report}>
          <Icon name={'exclamationcircleo'} size={20} color={'#fff'} />
        </Pressable>
        <Pressable style={styles.chat}>
          <Icon name={'message1'} size={20} color={'#fff'} />
        </Pressable>
      </View>
      <View style={styles.childContainer}>
        <Pressable
          disabled={props.prev?.disable}
          onPress={props.prev?.onPress}
          style={styles.caretleft}>
          <Icon
            name={'caretleft'}
            size={20}
            color={props.prev?.disable ? '#333' : '#fff'}
          />
        </Pressable>
        <Pressable
          disabled={props.next?.disable}
          onPress={props.next?.onPress}
          style={styles.caretRight}>
          <Icon
            name={'caretright'}
            size={20}
            color={props.next?.disable ? '#333' : '#fff'}
          />
        </Pressable>
      </View>
    </Animated.View>
  );
};

export default FooterView;
