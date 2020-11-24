import React, {useCallback, useRef} from 'react';
import {View, Animated} from 'react-native';
import {HomeResults} from 'westmanga-extensions';

import {useTop} from 'utils/hook';
import SlideItem from '@component/slideItem';
import styles, {SIZE_WIDTH} from './styles';

interface props {
  componentId: string;
  slide: HomeResults[];
}

const Slide: React.FC<props> = (props) => {
  const value = useTop(props.slide);
  const scrollX = useRef<Animated.Value>(new Animated.Value(0)).current;

  const onRenderItem = useCallback(
    ({item, index}) => {
      return (
        <SlideItem
          scrollX={scrollX}
          index={index}
          componentId={props.componentId}
          item={item}
          key={index}
        />
      );
    },
    [props.componentId, scrollX],
  );

  return (
    <View>
      {value ? (
        <Animated.FlatList
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: true},
          )}
          horizontal={true}
          data={value || []}
          renderItem={onRenderItem}
          snapToInterval={SIZE_WIDTH + 10.6}
          contentContainerStyle={styles.containerFlat}
          showsHorizontalScrollIndicator={false}
        />
      ) : null}
    </View>
  );
};

export default Slide;
