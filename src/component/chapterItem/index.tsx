import React, {useCallback} from 'react';
import {Pressable, Text} from 'react-native';
import styles from './styles';
import {chapterAPI} from '@utils/database';
import ads from '@utils/ads';
import root from '@utils/navigation/root';

interface props {
  componentId: string;
  title: string;
  item: {
    id: string;
    title: string;
    download: string;
    time: string;
  };
}

const ChapterItem: React.FC<props> = (props) => {
  const {state, onSetValue} = chapterAPI.useChapter(props.item.id);

  const onPress = useCallback(() => {
    const timeout = setTimeout(() => {
      root.push(props.componentId, {
        name: 'reader',
        options: {
          topBar: {
            visible: false,
          },
          bottomTabs: {
            visible: false,
          },
        },
        passProps: {
          id: props.item.id,
          title: props.title,
        },
      });
      onSetValue();
      ads.loadInterstitial();
    }, 100);
    return () => clearTimeout(timeout);
  }, [onSetValue, props.componentId, props.item.id, props.title]);

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={[styles.title, state ? styles.valid : styles.unvalid]}>
        {props.item.title}
      </Text>
      <Text style={styles.time}>{props.item.time}</Text>
    </Pressable>
  );
};

export default ChapterItem;
