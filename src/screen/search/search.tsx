import React from 'react';
import {Animated, View} from 'react-native';
import {getList} from 'westmanga-extensions';
import {useImmer} from 'use-immer';
import ItemByGenre from '@component/itemByGenre/itemByGenre';
import Loading from '@component/loading/loading';
import styles from './styles';

interface state {
  list: getList;
  current: number;
  loading: boolean;
}

const Search = (props: any) => {
  const [state, setState] = useImmer<state>({
    current: 1,
    list: {
      list: [],
      total: 0,
    },
    loading: true,
  });
  const onCallBack = React.useCallback(() => {
    getList({
      page: 1,
      search: props.search ? props.search : '',
      genre: props.genre ? props.genre : '',
    }).then((results) => {
      setState((draft) => {
        draft.list.list = results.list;
        draft.list.total = results.total;
        draft.loading = false;
      });
    });
  }, [props.genre, props.search, setState]);

  React.useEffect(onCallBack, []);

  const renderItem = React.useCallback(
    ({item, index}) => {
      return (
        <ItemByGenre componentId={props.componentId} key={index} item={item} />
      );
    },
    [props.componentId],
  );

  return (
    <View style={styles.container}>
      {state.loading ? (
        <Loading />
      ) : (
        <Animated.FlatList
          numColumns={3}
          data={state.list.list || []}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default Search;
