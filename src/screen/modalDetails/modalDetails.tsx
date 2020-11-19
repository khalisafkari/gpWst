import React from 'react';
import {Text, View, Animated} from 'react-native';
import Image from 'react-native-fast-image';
import {getPosts} from 'westmanga-extensions';
import Loading from '@component/loading';
import styles from './styles';
import ViewMore from 'component/viewMore';
import BtnBookmark from 'component/btnBookmark';

interface state extends getPosts {
  loading: boolean;
}

const ModalDetails = (props: any) => {
  const [state, setState] = React.useState<state>({
    loading: true,
    id: '',
    image: '',
    list: [],
    mangainfo: {
      author: '',
      genre: [],
      japanese_title: '',
      native_title: '',
      status: '',
      total_chapter: '',
    },
    sinopsis: '',
    title: '',
  });

  const onCallBack = React.useCallback(() => {
    getPosts(props.id).then((results) => {
      setState({loading: false, ...results});
    });
  }, [props.id]);

  React.useEffect(onCallBack, []);

  return (
    <View style={styles.container}>
      {state.loading ? (
        <Loading />
      ) : (
        <Animated.ScrollView>
          <View style={styles.imageContainer}>
            <Image source={{uri: props.image}} style={styles.image} />
          </View>
          <View style={styles.child}>
            <View style={styles.childTitle}>
              <View style={styles.container}>
                <Text style={styles.author}>{state.mangainfo.author}</Text>
                <Text style={styles.title}>{state.title}</Text>
              </View>
              <BtnBookmark
                id={props.id}
                image={props.image}
                title={props.title}
              />
            </View>

            <ViewMore text={state.sinopsis} />
          </View>
        </Animated.ScrollView>
      )}
    </View>
  );
};

export default ModalDetails;
