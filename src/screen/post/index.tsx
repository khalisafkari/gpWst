import React, {useCallback, useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import {sqlite} from '@utils/database';
import {usePosts} from '@utils/hook';
import Loading from '@component/loading';
import styles from './styles';
import ChapterList from '@component/chapterList';
import DetailContainer from '@component/detailContainer';
import InAppReview from 'react-native-in-app-review';
import {Navigation} from 'react-native-navigation';

interface props {
  id: string;
  title: string;
  image: string;
  componentId: string;
}

const Post: React.FC<props> = (props) => {
  const value = usePosts(props.id);
  const onHistroyAdd = useCallback(() => {
    sqlite.push('history', {
      id: props.id,
      title: props.title,
      image: props.image,
    });
  }, [props.id, props.image, props.title]);
  useEffect(onHistroyAdd, []);

  const onListner = useCallback(() => {
    const event = Navigation.events().registerComponentDidAppearListener(
      ({componentName}) => {
        if (componentName === 'com.bk2020.home') {
          if (InAppReview.isAvailable()) {
            InAppReview.RequestInAppReview();
          }
        }
      },
    );
    const listener = {
      componentDidDisappear: function () {
        if (event !== null) {
          event.remove();
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
  }, [props.componentId]);

  useEffect(onListner, []);

  return (
    <View style={styles.container}>
      {value ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <DetailContainer
            data={value}
            id={props.id}
            title={props.title}
            image={props.image}
            componentId={props.componentId}
          />
          <ChapterList componentId={props.componentId} item={value} />
        </ScrollView>
      ) : (
        <Loading />
      )}
    </View>
  );
};

export default Post;
