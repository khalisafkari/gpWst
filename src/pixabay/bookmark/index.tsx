import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Pressable, Text, View} from 'react-native';
import {Navigation} from 'react-native-navigation';
import Purchases from 'react-native-purchases';
import Image from 'react-native-fast-image';
import styles from './styles';
import dabatase from 'pixabay/database';
import LinearGradient from 'react-native-linear-gradient';
interface props {
  componentId: string;
}

const BookmarkPixabay: React.FC<props> = (props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isPro, setIsPro] = useState<boolean>(false);
  const [data, setData] = useState<string[]>([]);

  const onFetch = useCallback(() => {
    dabatase.getAll().then((results) => {
      if (results.length > 0) {
        setData(results);
      }
    });
  }, []);

  useEffect(() => {
    const listener = {
      componentDidAppear: function () {
        Purchases.getPurchaserInfo().then((PurchaserInfo) => {
          if (typeof PurchaserInfo.entitlements.active.Pro !== 'undefined') {
            setIsPro(true);
            setLoading(false);
            onFetch();
          } else {
            setLoading(false);
          }
        });
      },
    };
    const subscriber = Navigation.events().registerComponentListener(
      listener,
      props.componentId,
    );
    return () => {
      subscriber.remove();
    };
  }, [onFetch, props.componentId]);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size={20} color={'white'} />
      </View>
    );
  }

  const onRenderContent = ({item, index}: {item: any; index: number}) => {
    return (
      <Pressable
        onPress={() => {
          Navigation.push(props.componentId, {
            component: {
              name: 'com.bk2020.pixabay.posts',
              passProps: {
                id: item,
                largeImageURL: item,
              },
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
                        fromId: `image${item}`,
                        toId: `image${item}Dest`,
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
        <Image source={{uri: item}} style={styles.image} />
        <LinearGradient
          colors={['transparent', 'black']}
          style={styles.linear}
        />
      </Pressable>
    );
  };

  const keyExtractor = (_: any, index: number) => {
    return String(index);
  };

  return (
    <View style={styles.container}>
      {isPro ? (
        <FlatList
          keyExtractor={keyExtractor}
          numColumns={2}
          data={data}
          renderItem={onRenderContent}
        />
      ) : (
        <View style={styles.loading}>
          <Text style={styles.unlock}>Unlock Pro to access bookmarks</Text>
        </View>
      )}
    </View>
  );
};

export default BookmarkPixabay;
