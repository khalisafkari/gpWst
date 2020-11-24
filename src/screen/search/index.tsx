import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import {getList} from 'westmanga-extensions';
import {Navigation} from 'react-native-navigation';
import styles from './styles';
import ListBookmark from 'component/ListBookmark';

interface props {
  componentId: string;
  genre: string | null;
  search: string | null;
}

const Search: React.FC<props> = (props) => {
  const isMounted = useRef<boolean>(true);

  const [state, setState] = useState<getList>({
    list: [],
    total: 0,
  });
  //const [current, setCurrent] = useState<number>(1);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const onFetch = useCallback(() => {
    getList({
      genre: props.genre ? props.genre : '',
      search: props.search ? props.search : '',
    }).then((results) => {
      setState(results);
    });
  }, [props.genre, props.search]);

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

  return (
    <View style={styles.container}>
      <ListBookmark componentId={props.componentId} data={state.list} />
    </View>
  );
};

export default Search;
