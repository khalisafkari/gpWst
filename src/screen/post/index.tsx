import React, {useCallback, useEffect} from 'react';
import {View} from 'react-native';
import {sqlite} from '@utils/database';
import root from 'utils/navigation/root';
import {usePosts} from '@utils/hook';
import Loading from 'component/loading';
import styles from './styles';
import ChapterList from 'component/chapterList';

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

  root.useDetail(props.componentId, {
    name: 'detail',
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
  });

  return (
    <View style={styles.container}>
      {value ? (
        <ChapterList componentId={props.componentId} item={value} />
      ) : (
        <Loading />
      )}
    </View>
  );
};

export default Post;
