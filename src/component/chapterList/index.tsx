import React, {useCallback} from 'react';
import {getPosts} from 'westmanga-extensions';
import {ScrollView, View} from 'react-native';
import styles from './styles';
import ChapterItem from 'component/chapterItem';

interface props {
  componentId: string;
  item: getPosts;
}

const ChapterList: React.FC<props> = (props) => {
  const onRenderItem = useCallback(
    (item, index) => {
      return (
        <ChapterItem
          title={props.item.title}
          key={index}
          componentId={props.componentId}
          item={item}
        />
      );
    },
    [props.componentId, props.item.title],
  );

  return (
    <View style={styles.container}>
      <ScrollView>{props.item.list.map(onRenderItem)}</ScrollView>
    </View>
  );
};

export default ChapterList;
