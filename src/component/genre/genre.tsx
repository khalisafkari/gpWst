import React from 'react';
import {Pressable, Text, View} from 'react-native';
import genre from '@utils/genre';
import styles from './styles';

interface input {
  show: boolean;
  genre: string | null;
}

interface props {
  showMenu: (input: input) => void;
}

const Genre = (props: props) => {
  const [select, setSelect] = React.useState<string | null>(null);

  const onPressLabel = React.useCallback(
    (item: string) => {
      if (item == select) {
        setSelect(null);
        props.showMenu({
          genre: null,
          show: false,
        });
      } else {
        setSelect(item);
        props.showMenu({
          genre: item,
          show: true,
        });
      }
    },
    [props, select],
  );

  const renderItem = React.useCallback(
    (item, index) => {
      return (
        <Pressable
          onPress={() => onPressLabel(item)}
          style={[
            styles.btn,
            {
              backgroundColor: item === select ? '#f00' : '#333',
            },
          ]}
          key={index}>
          <Text style={styles.title}>{item}</Text>
        </Pressable>
      );
    },
    [onPressLabel, select],
  );

  return <View style={styles.container}>{genre.map(renderItem)}</View>;
};

export default Genre;
