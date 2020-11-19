import React from 'react';
import {Animated, View} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {useImmer} from 'use-immer';
import {sql} from '@utils/database';
import ItemByGenre from '@component/itemByGenre/itemByGenre';
import styles from './styles';
import Loading from '@component/loading';

interface state {
  data: Array<{
    id: string;
    title: string;
    image: string;
    create_at: string;
  }>;
  currentPage: number;
  totalPage: number;
  loading: boolean;
}

const Bookmark = (props: any) => {
  const [state, setState] = useImmer<state>({
    currentPage: 1,
    totalPage: 0,
    data: [],
    loading: true,
  });

  const onFetch = React.useCallback(() => {
    sql.all().then((results) => {
      setState((draft) => {
        draft.data = results.data;
        draft.totalPage = results.totalPages;
        draft.loading = false;
      });
    });
  }, [setState]);

  const onCallBack = React.useCallback(() => {
    const listener = {
      componentDidAppear: function () {
        onFetch();
      },
      componentDidDisappear: function () {},
    };
    const subscriber = Navigation.events().registerComponentListener(
      listener,
      props.componentId,
    );
    return () => {
      subscriber.remove();
    };
  }, [onFetch, props.componentId]);

  React.useEffect(onCallBack, []);

  const renderItem = React.useCallback(
    ({item, index}) => {
      return (
        <ItemByGenre componentId={props.componentId} key={index} item={item} />
      );
    },
    [props.componentId],
  );

  const onEnd = React.useCallback(() => {
    const {currentPage, totalPage} = state;
    if (currentPage < totalPage) {
      sql.all(currentPage + 1).then((results) => {
        setState((draft) => {
          draft.data = draft.data.concat(results.data);
          draft.totalPage = draft.totalPage;
          draft.currentPage = currentPage + 1;
        });
      });
    }
  }, [setState, state]);

  return (
    <View style={styles.container}>
      {state.loading ? (
        <Loading />
      ) : (
        <Animated.FlatList
          numColumns={3}
          data={state.data || []}
          renderItem={renderItem}
          onEndReachedThreshold={0.01}
          onEndReached={onEnd}
        />
      )}
    </View>
  );
};

export default Bookmark;
