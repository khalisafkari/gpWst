import React, {useCallback} from 'react';
import {Pressable, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {sqlite} from '@utils/database';
import styles from './styles';

interface props {
  id: string;
  title: string;
  image: string;
}

const BookmarkBtn: React.FC<props> = (props) => {
  const {state, addBookmark} = sqlite.useFindBookmark(props);

  const onPress = useCallback(() => {
    addBookmark();
  }, [addBookmark]);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text numberOfLines={2} style={styles.title}>
          {props.title}
        </Text>
      </View>
      <Pressable onPress={onPress} style={styles.btn}>
        <Icon name={'book'} size={20} color={state ? '#ff0000' : '#fff'} />
      </Pressable>
    </View>
  );
};

export default BookmarkBtn;
