import React, {useCallback} from 'react';
import {getPosts} from 'westmanga-extensions';
import {View} from 'react-native';
import styles from './styles';
import ChapterItem from 'component/chapterItem';

interface props {
  componentId: string;
  item: getPosts | any;
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
    <View style={styles.container}>{props.item.list.map(onRenderItem)}</View>
  );
};

export default ChapterList;
