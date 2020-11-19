import React from 'react';
import {Text, Animated, Pressable} from 'react-native';
import styles from './styles';

interface props {
  hide: Animated.Value;
  cancel(): void;
  save(): void;
}

const BtnAdvance = (props: props) => {
  const translateY = props.hide.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0],
  });

  return (
    <Animated.View style={[styles.container, {transform: [{translateY}]}]}>
      <Pressable onPress={props.cancel} style={styles.btn}>
        <Text style={styles.label}>CANCEL</Text>
      </Pressable>
      <Pressable onPress={props.save} style={styles.btn}>
        <Text style={styles.label}>SEARCH</Text>
      </Pressable>
    </Animated.View>
  );
};

export default BtnAdvance;
