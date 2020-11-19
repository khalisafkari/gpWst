import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {hId} from 'utils/database';
import Image from 'react-native-fast-image';
import styles from './styles';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
import {Navigation} from 'react-native-navigation';

interface props {
  id: string;
  componentId: string;
}

interface state {
  id: string;
  title: string;
  image: string;
  last_title: string;
  create_at: number;
}

const ItemHistory = (props: props) => {
  const [state, setState] = React.useState<state>({
    create_at: 0,
    id: '',
    image: '',
    last_title: '',
    title: '',
  });

  React.useEffect(() => {
    hId.getId(props.id).then(setState);
  }, [props.id]);

  return (
    <Pressable
      onPress={() => {
        Navigation.push(props.componentId, {
          component: {
            name: 'com.bk2020.posts',
            passProps: {
              id: state.id,
              title: state.title,
              image: state.image,
            },
            options: {
              bottomTabs: {
                visible: false,
              },
              topBar: {
                title: {
                  text: state.title,
                },
              },
            },
          },
        });
      }}
      style={styles.container}>
      <Image source={{uri: state.image}} style={styles.image} />
      <LinearGradient colors={['transparent', 'black']} style={styles.linear} />
      <View style={styles.child}>
        <Text numberOfLines={1} style={styles.title}>
          {state.title}
        </Text>
        <Text numberOfLines={1} style={styles.last_title}>
          <Icon name={'bars'} size={10} color={'#fff'} /> {state.last_title}
        </Text>
        <Text numberOfLines={1} style={styles.last_title}>
          <Icon name={'clockcircle'} size={10} color={'#fff'} />{' '}
          {moment(state.create_at).fromNow()}
        </Text>
      </View>
    </Pressable>
  );
};

export default ItemHistory;
