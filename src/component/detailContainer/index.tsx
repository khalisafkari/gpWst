import React from 'react';
import {ScrollView, View, Text} from 'react-native';
import {getPosts} from 'westmanga-extensions';
import Image from 'react-native-fast-image';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import BookmarkBtn from 'component/bookmarkBtn';
import GenreBtn from 'component/genreBtn';

interface props {
  id: string;
  title: string;
  image: string;
  data: getPosts;
}

const DetailContainer: React.FC<props> = (props) => {
  return (
    <ScrollView>
      <View style={styles.containerImage}>
        <Image source={{uri: props.image}} style={styles.image} />
        <LinearGradient
          colors={['transparent', 'black']}
          style={styles.linear}
        />
      </View>
      <BookmarkBtn id={props.id} title={props.title} image={props.image} />
      <View style={styles.boxInfo}>
        <Text style={styles.description}>
          {props.data.mangainfo.japanese_title}
        </Text>
        <Text style={styles.description}>{props.data.mangainfo.author}</Text>
      </View>
      <GenreBtn genre={props.data.mangainfo.genre} />
      <View style={styles.containerImage}>
        <Text style={styles.description}>{props.data.sinopsis}</Text>
      </View>
    </ScrollView>
  );
};

export default DetailContainer;
