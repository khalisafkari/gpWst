import React from 'react';
import {Pressable, Text, View} from 'react-native';
import styles from './styles';
import {hId, pId} from '@utils/database';
import {Navigation} from 'react-native-navigation';

interface props {
  item: {
    id: string;
    title: string;
    download: string;
    time: string;
  };
  componentId: string;
  props: {
    id: string;
    title: string;
    image: string;
  };
}

const ItemPosts = (props: props) => {
  const [status, setStatus] = React.useState<boolean>(false);
  React.useEffect(() => {
    pId
      .getId(props.item.id)
      .then((results) => {
        setStatus(results);
      })
      .catch(() => {});
  }, [props.item.id]);

  const onItem = React.useCallback(() => {
    pId
      .setId(props.item.id)
      .then((results) => {
        setStatus(results);
      })
      .finally(() => {
        Navigation.push(props.componentId, {
          component: {
            name: 'com.bk2020.postsview',
            options: {
              bottomTabs: {
                visible: false,
              },
              topBar: {
                visible: false,
              },
            },
            passProps: {
              id: props.item.id,
              title: props.item.title,
              isId: props.props.id,
              isTitle: props.props.title,
            },
          },
        }).then(() => {
          hId.setId(
            props.props.id,
            props.props.title,
            props.props.image,
            props.item.title,
          );
        });
      });
  }, [
    props.componentId,
    props.item.id,
    props.item.title,
    props.props.id,
    props.props.image,
    props.props.title,
  ]);

  return (
    <Pressable onPress={onItem} style={styles.container}>
      <View>
        <Text
          style={[
            styles.title,
            {
              color: status ? '#333' : '#fff',
            },
          ]}>
          {props.item.title}
        </Text>
        <Text style={styles.time}>{props.item.time}</Text>
      </View>
    </Pressable>
  );
};

export default ItemPosts;
