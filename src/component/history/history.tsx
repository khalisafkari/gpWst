import React from 'react';
import {FlatList, Pressable, Text, View} from 'react-native';
import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/AntDesign';
import {hId} from 'utils/database';
import ItemHistory from 'component/itemHistory';
import styles, {SIZE_WIDTH} from './styles';
import LinearGradient from 'react-native-linear-gradient';

interface props {
  componentId: string;
}

const History = (props: props) => {
  const [state, setState] = React.useState<string[]>([]);

  const onFetch = React.useCallback(() => {
    hId.all(1, 5).then((results) => {
      setState(results.data);
    });
  }, []);

  const onCallBack = React.useCallback(() => {
    const listener = {
      componentDidAppear: function () {
        onFetch();
      },
      componentDidDisappear: function () {},
    };
    const subscriber = Navigation.events().registerComponentListener(
      listener,
      props.componentId,
    );
    return () => {
      subscriber.remove();
    };
  }, [onFetch, props.componentId]);
  React.useEffect(onCallBack, []);

  const renderItem = React.useCallback(
    ({item, index}) => {
      return (
        <ItemHistory id={item} componentId={props.componentId} key={index} />
      );
    },
    [props.componentId],
  );

  const HeaderComponent = React.useCallback(() => {
    return (
      <Pressable
        onPress={() => {
          Navigation.push(props.componentId, {
            component: {
              name: 'com.bk2020.history',
              options: {
                bottomTabs: {
                  visible: false,
                },
                topBar: {
                  title: {
                    text: 'History',
                  },
                },
              },
            },
          });
        }}
        style={styles.container}>
        <LinearGradient
          style={styles.historyView}
          colors={['transparent', 'black']}>
          <Icon name={'clockcircle'} size={25} color={'#fff'} />
          <Text style={styles.title}>AllHistory</Text>
        </LinearGradient>
      </Pressable>
    );
  }, [props.componentId]);

  const getLayout = (data: any, index: number) => {
    return {length: SIZE_WIDTH + 10, offset: (SIZE_WIDTH + 10) * index, index};
  };

  return (
    <View>
      {state.length > 0 ? (
        <FlatList
          snapToInterval={SIZE_WIDTH + 10}
          ListHeaderComponent={HeaderComponent}
          horizontal
          data={state || []}
          getItemLayout={getLayout}
          keyExtractor={(item) => String(item)}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
        />
      ) : null}
    </View>
  );
};

export default History;
