import React from 'react';
import {Animated, Pressable as Touch, Text, View} from 'react-native';
import {HomeResults} from 'westmanga-extensions';
import Image from 'react-native-fast-image';
import LinearGradien from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
import styles, {SIZE_WIDTH} from './styles';
import {Navigation} from 'react-native-navigation';

interface props {
  state: HomeResults[];
  componentId: string;
}

const Pressable = Animated.createAnimatedComponent(Touch);

const Slide = (props: props) => {
  const ref = React.useRef<any>();
  const scrollX = React.useRef<Animated.Value>(new Animated.Value(0)).current;
  const renderItem = React.useCallback(
    (item: HomeResults, index) => {
      const inputRange = [
        (index - 2) * SIZE_WIDTH + 6,
        index * SIZE_WIDTH + 6,
        (index + 2) * SIZE_WIDTH + 6,
      ];

      const translateY = scrollX.interpolate({
        inputRange,
        outputRange: [25, 10, 25],
      });
      return (
        <Pressable
          onPress={() => {
            Navigation.push(props.componentId, {
              component: {
                name: 'com.bk2020.posts',
                passProps: {
                  id: item.id,
                  title: item.boxinfo.tt,
                  image: item.image,
                },
                options: {
                  topBar: {
                    title: {
                      text: item.boxinfo.tt,
                    },
                  },
                  bottomTabs: {
                    visible: false,
                  },
                },
              },
            });
          }}
          key={index}
          style={[styles.container, {transform: [{translateY}]}]}>
          <Image source={{uri: item.image}} style={styles.image} />
          <LinearGradien
            colors={['rgba(0,0,0,0)', 'black']}
            style={styles.linear}
          />
          <View style={[styles.subItem]}>
            <Text style={styles.type}>{item.type}</Text>
            <Text style={styles.title}>{item.boxinfo.tt}</Text>
            <View style={styles.botChild}>
              <Text style={[styles.type, {textAlignVertical: 'center'}]}>
                <Icon name={'clockcircle'} size={10} color={'#fff'} />{' '}
                {item.fixyear.time}
              </Text>
              <Text style={styles.type}>
                <Icon name={'totop'} size={10} color={'#fff'} />{' '}
                {item.fixyear.last_title}
              </Text>
            </View>
          </View>
        </Pressable>
      );
    },
    [props.componentId, scrollX],
  );

  const onContentSizeChange = React.useCallback(() => {
    ref.current.scrollTo({
      x: SIZE_WIDTH * 3 + 6,
      y: 0,
      animated: false,
    });
  }, [ref]);

  return (
    <View>
      <Animated.ScrollView
        fadingEdgeLength={100}
        snapToAlignment={'center'}
        snapToInterval={SIZE_WIDTH + 6}
        ref={ref}
        onContentSizeChange={onContentSizeChange}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        contentContainerStyle={styles.scrollContainer}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal>
        {props.state.map(renderItem)}
      </Animated.ScrollView>
    </View>
  );
};

export default Slide;
