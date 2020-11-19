import React from 'react';
import {Animated, Pressable, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './styles';

interface props {
  animated: Animated.Value;
  prevPress: {
    disable: boolean;
    onPress: () => void;
  };
  nextPress: {
    disable: boolean;
    onPress: () => void;
  };
}

const FooterP = (props: props) => {
  const translateY = props.animated.interpolate({
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
          disabled={props.prevPress.disable}
          onPress={props.prevPress.onPress}
          style={styles.caretleft}>
          <Icon
            name={'caretleft'}
            size={20}
            color={props.prevPress.disable ? '#333' : '#fff'}
          />
        </Pressable>
        <Pressable
          disabled={props.nextPress.disable}
          onPress={props.nextPress.onPress}
          style={styles.caretRight}>
          <Icon
            name={'caretright'}
            size={20}
            color={props.nextPress.disable ? '#333' : '#fff'}
          />
        </Pressable>
      </View>
    </Animated.View>
  );
};

export default FooterP;
