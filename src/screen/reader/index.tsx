import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, Animated, LayoutChangeEvent} from 'react-native';
import {getPostsView} from 'westmanga-extensions';
import {Navigation} from 'react-native-navigation';
import {WebView} from 'react-native-webview';
import Loading from '@component/loading';
import html from '@utils/html';
import styles from './styles';
import HeaderView from '@component/headerView';
import FooterView from '@component/footerView';
import {chapterAPI} from '@utils/database';

interface props {
  id: string;
  title: string;
  componentId: string;
}

const Reader: React.FC<props> = (props) => {
  const scrollY = useRef<Animated.Value>(new Animated.Value(0)).current;
  const [layout, setLayout] = useState<number>(0);
  const isMounted = useRef<boolean>(true);

  const [state, setState] = useState<getPostsView>({
    image: [],
    next: '',
    prev: '',
  });

  const [oldId, setOldId] = useState<string | null>(props.id);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const onFetch = useCallback(() => {
    getPostsView(props.id).then((results) => {
      if (isMounted.current) {
        setState(results);
      }
    });
  }, [props.id]);
  useEffect(() => {
    const listener = {
      componentDidAppear: function () {
        onFetch();
      },
    };
    const subscription = Navigation.events().registerComponentListener(
      listener,
      props.componentId,
    );
    return () => {
      subscription.remove();
    };
  }, [onFetch, props.componentId]);

  // eslint-disable-next-line no-shadow
  const onLayoutSize = useCallback((layout: LayoutChangeEvent) => {
    setLayout(layout.nativeEvent.layout.height);
  }, []);

  const onScrollY = ({nativeEvent}: any) => {
    const layout_size = Math.round(layout);
    const SIZE = Math.round(nativeEvent.contentOffset.y + layout_size);
    if (Math.round(nativeEvent.contentOffset.y) < 56) {
      Animated.timing(scrollY, {
        toValue: 0,
        useNativeDriver: true,
        duration: 500,
      }).start();
    } else if (SIZE > Math.round(nativeEvent.contentSize.height - 56)) {
      Animated.timing(scrollY, {
        toValue: 0,
        useNativeDriver: true,
        duration: 500,
      }).start();
    } else {
      Animated.timing(scrollY, {
        toValue: 1,
        useNativeDriver: true,
        duration: 500,
      }).start();
    }
  };

  const onMessage = ({nativeEvent}: any) => {
    if (nativeEvent.data === 'up') {
      Animated.timing(scrollY, {
        toValue: 0,
        useNativeDriver: true,
        duration: 500,
      }).start();
    }
  };

  const onPrev = useCallback((item: string) => {
    setOldId(item);
    setState({
      image: [],
      prev: '',
      next: '',
    });
    chapterAPI.setChapter(item);
    getPostsView(item).then((results) => {
      setState(results);
    });
  }, []);
  const onNext = useCallback((item: string) => {
    setOldId(item);
    setState({
      image: [],
      prev: '',
      next: '',
    });
    chapterAPI.setChapter(item);
    getPostsView(item).then((results) => {
      setState(results);
    });
  }, []);

  return (
    <View style={styles.container}>
      {state.image.length > 1 ? (
        <WebView
          onLayout={onLayoutSize}
          onScroll={onScrollY}
          source={{
            html: html(state.image),
          }}
          onMessage={onMessage}
        />
      ) : (
        <Loading />
      )}
      <HeaderView
        componentId={props.componentId}
        title={props.title}
        scrollY={scrollY}
        subtitle={oldId}
      />
      <FooterView
        next={{
          disable: !state.next,
          onPress: () => onNext(state.next),
        }}
        prev={{
          disable: !state.prev,
          onPress: () => onPrev(state.prev),
        }}
        scrollY={scrollY}
      />
    </View>
  );
};

export default Reader;
