import React from 'react';
import {Alert, Animated, View} from 'react-native';
import {Home, HomeResults, TotalPageHome} from 'westmanga-extensions';
import Item from '@component/item';
import {useImmer} from 'use-immer';
import Icon from 'react-native-vector-icons/AntDesign';
import {Navigation} from 'react-native-navigation';
import Loading from '@component/loading';
import styles from './styles';

interface state {
  total: number;
  current: number;
  results: HomeResults[];
  loading: boolean;
}

const List = (props: any) => {
  const [immer, setImmer] = useImmer<state>({
    current: 1,
    total: 0,
    results: [],
    loading: true,
  });
  const refTop = React.useRef<any>();

  const scrollY = React.useRef<Animated.Value>(new Animated.Value(0)).current;
  const onFetch = React.useCallback(() => {
    if (immer.results.length > 0 && !immer.loading) {
      return;
    } else {
      Home({page: 1})
        .then((results) => {
          setImmer((draft) => {
            draft.results = results;
            draft.loading = false;
          });
        })
        .catch(() => {
          Alert.alert('connection', 'failed fetch');
        })
        .finally(() => {
          TotalPageHome().then((total) => {
            setImmer((draft) => {
              draft.total = total;
            });
          });
        });
    }
  }, [immer.loading, immer.results.length, setImmer]);
  const onShowMenu = React.useCallback(() => {
    Icon.getImageSource('rocket1', 20).then((icons) => {
      Navigation.mergeOptions(props.componentId, {
        topBar: {
          rightButtons: [
            {
              id: 'show-modal',
              icon: icons,
            },
          ],
        },
      });
    });
  }, [props.componentId]);
  const onCallBack = React.useCallback(() => {
    const listener = {
      componentDidAppear: function () {
        onFetch();
        onShowMenu();
        refTop.current = Navigation.events().registerNavigationButtonPressedListener(
          ({buttonId}) => {
            if (buttonId === 'show-modal') {
              Navigation.showModal({
                stack: {
                  children: [
                    {
                      component: {
                        name: 'com.bk2020.modaladvance',
                      },
                    },
                  ],
                },
              });
            }
          },
        );
      },
      componentDidDisappear: function () {
        if (refTop.current != null) {
          refTop.current.remove();
        }
      },
    };

    const subscriber = Navigation.events().registerComponentListener(
      listener,
      props.componentId,
    );

    return () => {
      subscriber.remove();
    };
  }, [onFetch, onShowMenu, props.componentId]);

  React.useEffect(onCallBack, []);

  const renderItem = React.useCallback(
    ({item, index}: {item: HomeResults; index: number}) => {
      return <Item componentId={props.componentId} key={index} item={item} />;
    },
    [props.componentId],
  );

  const onEnd = React.useCallback(() => {
    const {total, current} = immer;
    if (current < total) {
      Home({page: current + 1}).then((results) => {
        setImmer((draft) => {
          draft.results = draft.results.concat(results);
          draft.current++;
        });
      });
    }
  }, [immer, setImmer]);

  return (
    <View style={styles.container}>
      {immer.loading ? (
        <Loading />
      ) : (
        <Animated.FlatList
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: true},
          )}
          keyExtractor={(item) => String(item.id)}
          numColumns={3}
          data={immer.results || []}
          renderItem={renderItem}
          onEndReachedThreshold={0.01}
          onEndReached={onEnd}
        />
      )}
    </View>
  );
};

export default List;
