import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FlatList, ToastAndroid, View} from 'react-native';
import {Home, HomeResults, TotalPageHome} from 'westmanga-extensions';
import Item from '@component/Item';
import Loading from '@component/loading';
import styles, {SIZE_WIDTH} from './styles';
import root from 'utils/navigation/root';

interface props {
  componentId: string;
}

interface state {
  data: HomeResults[];
  current?: number;
  total?: number;
}

const List: React.FC<props> = (props) => {
  const [state, setState] = useState<HomeResults[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [current, setCurrent] = useState<number>(1);

  const isMounted = useRef<boolean>(true);
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  root.useSearch(props.componentId);

  const onFetch = useCallback(() => {
    Promise.all([Home({}), TotalPageHome()]).then((results) => {
      if (isMounted.current) {
        setState(results[0]);
        setTotal(results[1]);
      }
    });
  }, []);

  useEffect(onFetch, []);

  const onRenderItem = useCallback(
    ({item, index}) => {
      return <Item componentId={props.componentId} item={item} key={index} />;
    },
    [props.componentId],
  );

  const onEndReach = useCallback(() => {
    if (typeof current !== 'undefined' && typeof total !== 'undefined') {
      if (current < total) {
        Home({page: current + 1}).then((results) => {
          setState(state.concat(results));
          setCurrent(current + 1);
          ToastAndroid.show('done', ToastAndroid.LONG);
        });
      }
    }
  }, [current, state, total]);

  const onLayout = useCallback((_, index) => {
    return {length: SIZE_WIDTH * 1.5, offset: SIZE_WIDTH * 1.5 * index, index};
  }, []);

  return (
    <View style={styles.container}>
      {state.length > 1 ? (
        <FlatList
          getItemLayout={onLayout}
          onEndReached={onEndReach}
          data={state}
          numColumns={3}
          renderItem={onRenderItem}
          onEndReachedThreshold={0.01}
          showsVerticalScrollIndicator={false}
          snapToInterval={SIZE_WIDTH * 1.5 + 10}
        />
      ) : (
        <Loading />
      )}
    </View>
  );
};

export default List;
