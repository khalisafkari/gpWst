import React, {useCallback} from 'react';
import {ScrollView, Text, View} from 'react-native';
import styles from './styles';

interface props {
  genre: Array<{
    id: string;
    title: string;
  }> | null;
}

const GenreBtn: React.FC<props> = (props) => {
  const genreItem = useCallback((item, index) => {
    return (
      <View style={styles.item} key={index}>
        <Text numberOfLines={1} style={styles.title}>
          {item.title}
        </Text>
      </View>
    );
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={false}
      horizontal={true}>
      {props.genre ? props.genre.map(genreItem) : null}
    </ScrollView>
  );
};

export default GenreBtn;
