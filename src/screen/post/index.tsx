import React, {useCallback, useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import {sqlite} from '@utils/database';
import {usePosts} from '@utils/hook';
import Loading from 'component/loading';
import styles from './styles';
import ChapterList from 'component/chapterList';
import DetailContainer from 'component/detailContainer';

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
