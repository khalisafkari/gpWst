import React from 'react';
import {View, Animated} from 'react-native';
import {hId} from 'utils/database';
import {useImmer} from 'use-immer';
import ItemHistory from 'component/itemHistory';
import styles from './styles';
import Loading from 'component/loading';

interface state {
  data: string[];
  currentPage: number;
  totalPage: number;
  loading: boolean;
}

const History = (props: any) => {
  const [state, setState] = useImmer<state>({
    data: [],
    currentPage: 1,
    totalPage: 0,
    loading: true,
  });

  const onCallBack = React.useCallback(() => {
    hId.all().then((results) => {
      setState((draft) => {
        draft.data = results.data;
        draft.totalPage = results.totalPages;
        draft.loading = false;
      });
    });
  }, [setState]);
  React.useEffect(onCallBack, []);

  const renderItem = React.useCallback(
    ({item, index}) => {
      return (
        <ItemHistory key={index} id={item} componentId={props.componentId} />
      );
    },
    [props.componentId],
  );

  const onEnd = React.useCallback(() => {
    const {currentPage, totalPage} = state;
    if (currentPage < totalPage) {
      hId.all(currentPage + 1).then((results) => {
        setState((draft) => {
          draft.data = draft.data.concat(results.data);
          draft.totalPage = results.totalPages;
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
          keyExtractor={(item) => String(item)}
          onEndReachedThreshold={0.01}
          onEndReached={onEnd}
        />
      )}
    </View>
  );
};

export default History;
