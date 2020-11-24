import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import {allItem, pagination, sqlite} from 'utils/database';
import {Navigation} from 'react-native-navigation';
import styles from './styles';
import ListBookmark from '@component/ListBookmark';
import Loading from '@component/loading';

interface props {
  componentId: string;
}

const History: React.FC<props> = (props) => {
  const isMounted = useRef<boolean>(true);

  const [raw, setRaw] = useState<allItem[]>([]);
  const [state, setState] = useState<allItem[]>([]);
  const [current, setCurrent] = useState<number>(1);
  const [total, setTotal] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const onFetch = useCallback(() => {
    sqlite.getAll('history').then((results) => {
      const {data, totalPages} = pagination(results, 1, 10);
      setLoading(false);
      setTotal(totalPages);
      setRaw(results);
      setState(data);
    });
  }, []);
  useEffect(() => {
    const listener = {
      componentDidAppear: function () {
        onFetch();
      },
    };
    const subscriptions = Navigation.events().registerComponentListener(
      listener,
      props.componentId,
    );
    return () => {
      subscriptions.remove();
    };
  }, [onFetch, props.componentId]);

  const onEnd = useCallback(() => {
    if (current !== undefined && total !== undefined) {
      if (current < total) {
        const {data, totalPages, currentPage} = pagination(
          raw,
          current + 1,
          10,
        );
        setCurrent(currentPage);
        setState(state.concat(data));
        setTotal(totalPages);
      }
    }
  }, [current, raw, state, total]);

  return (
    <View style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <ListBookmark
          onEndReached={onEnd}
          componentId={props.componentId}
          data={state}
        />
      )}
    </View>
  );
};

export default History;
