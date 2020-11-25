import React from 'react';
import {GestureResponderEvent, Pressable, Text, View} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';

interface props {
  title: string;
  icon: string;
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
}

const AccountItem: React.FC<props> = (props) => {
  return (
    <Pressable onPress={props.onPress} style={styles.container}>
      <View style={styles.subContainer}>
        <Icon name={props.icon} size={20} color={'#fff'} />
        <Text style={styles.title}>{props.title}</Text>
      </View>
    </Pressable>
  );
};

export default AccountItem;
