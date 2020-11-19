import React from 'react';
import {Animated, LayoutChangeEvent, View} from 'react-native';
import {WebView} from 'react-native-webview';
import {getPostsView} from 'westmanga-extensions';
import {useImmer} from 'use-immer';
import styles, {width} from './styles';
import HeaderP from 'component/headerP';
import FooterP from 'component/footerP';
import {pId} from 'utils/database';
import htmlConverter from '@utils/htmlConverter';
import Loading from 'component/loading';

interface state {
  title: string;
  id: string;
  loading: boolean;
  image: string[];
  next: string;
  prev: string;
}

const PostsView = (props: any) => {
  const [state, setState] = useImmer<state>({
    title: '',
    image: [],
    next: '',
    prev: '',
    id: '',
    loading: true,
  });

  const [layout, setLayout] = React.useState<number>(0);

  const scrollY = React.useRef<Animated.Value>(new Animated.Value(0)).current;
  const progressX = React.useRef<Animated.Value>(new Animated.Value(0)).current;
  const progressHide = React.useRef<Animated.Value>(new Animated.Value(0))
    .current;

  const onCallBack = React.useCallback(() => {
    getPostsView(props.id).then((results) => {
      setState((draft) => {
        draft.title = props.isTitle;
        draft.image = results.image;
        draft.next = results.next;
        draft.prev = results.prev;
        draft.id = props.id;
      });
    });
  }, [props.id, props.isTitle, setState]);
  React.useEffect(onCallBack, []);

  const onLayout = React.useCallback((layout: LayoutChangeEvent) => {
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

  const onLoadProgress = ({nativeEvent}: any) => {
    Animated.timing(progressX, {
      toValue: Math.round(nativeEvent.progress),
      useNativeDriver: true,
      duration: 5000,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(progressHide, {
          useNativeDriver: true,
          toValue: 1,
          duration: 1000,
        }).start();
      }, 5000);
    });
  };

  const onPrev = () => {
    setState((draft) => {
      draft.image = [];
    });
    getPostsView(state.prev).then((results) => {
      setState((draft) => {
        draft.image = results.image;
        draft.next = results.next;
        draft.prev = results.prev;
        draft.id = state.prev;
      });
      pId.setId(state.prev);
      progressX.setValue(0);
      progressHide.setValue(0);
    });
  };

  const onNext = () => {
    setState((draft) => {
      draft.image = [];
    });
    getPostsView(state.next).then((results) => {
      setState((draft) => {
        draft.image = results.image;
        draft.next = results.next;
        draft.prev = results.prev;
        draft.id = state.next;
      });
      pId.setId(state.next);
      progressX.setValue(0);
      progressHide.setValue(0);
    });
  };

  const translateY = scrollY.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -56],
  });

  return (
    <View style={styles.container}>
      {state.image.length > 1 ? (
        <WebView
          onLayout={onLayout}
          onScroll={onScrollY}
          source={{
            html: htmlConverter(state.image),
          }}
          onMessage={onMessage}
          onLoadProgress={onLoadProgress}
        />
      ) : (
        <Loading />
      )}
      <HeaderP
        isSubtitle={state.id ? state.id : props.id}
        isTitle={props.isTitle}
        componentId={props.componentId}
        animated={scrollY}
      />
      <FooterP
        nextPress={{
          disable: state.next ? false : true,
          onPress: onNext,
        }}
        prevPress={{
          disable: state.prev ? false : true,
          onPress: onPrev,
        }}
        animated={scrollY}
      />
      <Animated.View
        style={[
          styles.loading,
          {
            width,
            opacity: progressHide.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0],
            }),
            transform: [
              {
                translateY,
              },
              {
                scaleX: progressX.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 10],
                }),
              },
            ],
          },
        ]}
      />
    </View>
  );
};

export default PostsView;
