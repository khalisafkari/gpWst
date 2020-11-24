import React, {useCallback, useState} from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';
import genre from '@utils/genre';
import styles from './styles';

interface props {
  onPress: (event: string | null) => void;
}

const GenreList: React.FC<props> = (props) => {
  const [select, setSelect] = useState<string | null>(null);

  const onPress = useCallback(
    (item: string) => {
      if (select) {
        if (select === item) {
          setSelect(null);
          props.onPress(null);
        } else {
          setSelect(item);
          props.onPress(item);
        }
      } else {
        setSelect(item);
        props.onPress(item);
      }
    },
    [props, select],
  );

  const onItem = useCallback(
    (item, index) => {
      return (
        <Pressable
          onPress={() => onPress(item)}
          style={[
            styles.item,
            {
              backgroundColor: select === item ? '#ff0000' : '#333',
            },
          ]}
          key={index}>
          <Text style={styles.title}>{item}</Text>
        </Pressable>
      );
    },
    [onPress, select],
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>{genre.map(onItem)}</View>
    </ScrollView>
  );
};

export default GenreList;
