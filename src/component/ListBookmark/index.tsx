import React, {useCallback} from 'react';
import {FlatList, View} from 'react-native';
import {allItem} from 'utils/database';
import BookmarkItem from 'component/BookmarkItem';
import styles from './styles';

interface props {
  componentId: string;
  data: allItem[] | any;
  onEndReached?: ((info: {distanceFromEnd: number}) => void) | null | undefined;
}

const ListBookmark: React.FC<props> = (props) => {
  const onRenderItem = useCallback(
    ({item, index}) => {
      return (
        <BookmarkItem componentId={props.componentId} item={item} key={index} />
      );
    },
    [props.componentId],
  );

  return (
    <View style={styles.container}>
      <FlatList
        onEndReachedThreshold={0.01}
        onEndReached={props.onEndReached}
        data={props.data}
        renderItem={onRenderItem}
        numColumns={3}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ListBookmark;
