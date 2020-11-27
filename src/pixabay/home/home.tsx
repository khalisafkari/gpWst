import React from 'react';
import {Animated, Pressable, Text, TextInput, View} from 'react-native';
import Image from 'react-native-fast-image';
import makeCancelable from './usePromise';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import {Navigation} from 'react-native-navigation';

const HomePixabay = (props: any) => {
  const [state, setState] = React.useState<any>();
  const scrollY = React.useRef<Animated.Value>(new Animated.Value(0)).current;

  const onCallBack = React.useCallback((text: string) => {
    makeCancelable(
      fetch(
        `https://pixabay.com/api/?key=8395946-db4a048586900d06284c1bee5&q=${text}&safesearch=true&image_type=photo&pretty=true`,
      ),
    )
      .promise.then((res: any) => res.json())
      .then((results) => {
        setState(results);
      });
  }, []);

  const renderItem = React.useCallback(
    ({item, index}) => {
      return (
        <Pressable
          onPress={() => {
            Navigation.push(props.componentId, {
              component: {
                name: 'com.bk2020.pixabay.posts',
                passProps: item,
                options: {
                  topBar: {
                    visible: false,
                  },
                  bottomTabs: {
                    visible: false,
                  },
                  animations: {
                    push: {
                      sharedElementTransitions: [
                        {
                          fromId: `image${item.id}`,
                          toId: `image${item.id}Dest`,
                        },
                      ],
                    },
                  },
                },
              },
            });
          }}
          style={styles.item}
          key={index}>
          <Image source={{uri: item.webformatURL}} style={styles.image} />
          <LinearGradient
            colors={['transparent', 'black']}
            style={styles.linear}
          />
        </Pressable>
      );
    },
    [props.componentId],
  );

  const ListEmptyComponent = () => {
    return (
      <View style={styles.empty}>
        <Image
          source={{uri: 'https://i.ibb.co/M2Pdw2m/logo.png'}}
          style={{
            height: 50,
            width: 50 * 2,
          }}
          resizeMode={Image.resizeMode.contain}
        />
        <Text style={styles.titlePixabay}>Pixabay</Text>
        <Text style={styles.subPixabay}>
          All content on Pixabay can be used for free for commercial and
          noncommercial{' '}
        </Text>
      </View>
    );
  };

  const translateY = scrollY.interpolate({
    inputRange: [0, 500],
    outputRange: [0, 100],
  });

  return (
    <View style={styles.container}>
      <Animated.FlatList
        keyExtractor={(item) => String(item.id)}
        data={state ? state.hits : []}
        renderItem={renderItem}
        numColumns={2}
        ListEmptyComponent={ListEmptyComponent}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
      />
      <Animated.View
        style={[
          styles.inputContainer,
          {
            transform: [{translateY}],
          },
        ]}>
        <TextInput onChangeText={onCallBack} placeholder={'search...'} />
      </Animated.View>
    </View>
  );
};

export default HomePixabay;
