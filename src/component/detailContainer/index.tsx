import React, {useCallback} from 'react';
import {View, Text, Pressable} from 'react-native';
import {getPosts} from 'westmanga-extensions';
import Image from 'react-native-fast-image';
import styles from './styles';
import BookmarkBtn from '@component/bookmarkBtn';
import GenreBtn from '@component/genreBtn';
import ReadMore from 'react-native-read-more-text';
import root from '@utils/navigation/root';

interface props {
  id: string;
  title: string;
  image: string;
  data: getPosts | any;
  componentId: string;
}

const DetailContainer: React.FC<props> = (props) => {
  const less = useCallback((handlePress: any) => {
    return (
      <Pressable onPress={handlePress}>
        <Text style={styles.color}>Hide</Text>
      </Pressable>
    );
  }, []);

  const more = useCallback((handlePress: any) => {
    return (
      <Pressable onPress={handlePress}>
        <Text style={styles.color}>more</Text>
      </Pressable>
    );
  }, []);

  const onViewImage = useCallback(() => {
    const timeout = setTimeout(() => {
      root.push(props.componentId, {
        name: 'fullimage',
        options: {
          topBar: {
            visible: false,
          },
          statusBar: {
            visible: false,
            translucent: false,
          },
          bottomTabs: {
            visible: false,
          },
          animations: {
            push: {
              sharedElementTransitions: [
                {
                  fromId: 'sourceImage',
                  toId: 'destinationImage',
                },
              ],
            },
          },
        },
        passProps: {
          url: props.image,
        },
      });
    }, 100);
    return () => clearTimeout(timeout);
  }, [props.componentId, props.image]);

  return (
    <View>
      <Pressable onPress={onViewImage} style={styles.container}>
        <Image source={{uri: props.image}} style={styles.image} />
      </Pressable>
      <BookmarkBtn
        author={props.data.mangainfo.author}
        id={props.id}
        title={props.title}
        image={props.image}
      />
      <GenreBtn genre={props.data.mangainfo.genre} />

      <View style={styles.subContainer}>
        <View style={styles.containerSynopsis}>
          <ReadMore
            renderTruncatedFooter={more}
            renderRevealedFooter={less}
            numberOfLines={3}>
            <Text style={styles.sinopsis}>{props.data.sinopsis}</Text>
          </ReadMore>
        </View>
        <Text numberOfLines={2} style={styles.total}>
          total chapter : {props.data.list.length}
        </Text>
      </View>
    </View>
  );
};

export default DetailContainer;
