import React from 'react';
import {View, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './styles';
import {Navigation} from 'react-native-navigation';
import ItemPosts from 'component/itemPosts';
import usePromise from './usePromise';
import Loading from 'component/loading';

const Posts = (props: any) => {
  const state = usePromise(props.id);

  const refBtn = React.useRef<any>();

  const showMenu = React.useCallback(() => {
    Icon.getImageSource('infocirlceo', 20).then((icon) => {
      Navigation.mergeOptions(props.componentId, {
        topBar: {
          rightButtons: [
            {
              icon,
              id: 'show-detail',
            },
          ],
        },
      });
    });
  }, [props.componentId]);
  const onCallBack = React.useCallback(() => {
    const listener = {
      componentDidAppear: function () {
        showMenu();
        refBtn.current = Navigation.events().registerNavigationButtonPressedListener(
          ({buttonId}) => {
            if (buttonId === 'show-detail') {
              Navigation.push(props.componentId, {
                component: {
                  name: 'com.bk2020.modaldetails',
                  passProps: {
                    id: props.id,
                    title: props.title,
                    image: props.image,
                  },
                  options: {
                    topBar: {
                      title: {
                        text: props.title,
                      },
                    },
                    bottomTabs: {
                      visible: false,
                    },
                  },
                },
              });
            }
          },
        );
      },
      componentDidDisappear: function () {
        if (refBtn.current != null) {
          refBtn.current.remove();
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
  }, [props.componentId, props.id, props.image, props.title, showMenu]);

  React.useEffect(onCallBack, []);

  const renderItem = React.useCallback(
    (item, index) => {
      return (
        <ItemPosts
          props={{
            id: props.id,
            title: props.title,
            image: props.image,
          }}
          item={item}
          key={index}
          componentId={props.componentId}
        />
      );
    },
    [props.componentId, props.id, props.image, props.title],
  );

  return (
    <View style={styles.container}>
      {state ? (
        <Animated.ScrollView>{state.list.map(renderItem)}</Animated.ScrollView>
      ) : (
        <Loading />
      )}
    </View>
  );
};

export default Posts;
