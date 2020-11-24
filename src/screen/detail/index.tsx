import React from 'react';
import {View} from 'react-native';
import {usePosts} from '@utils/hook';
import Loading from '@component/loading';
import styles from './styles';
import DetailContainer from 'component/detailContainer';

interface props {
  componentId: string;
  id: string;
  title: string;
  image: string;
}

const Detail: React.FC<props> = (props) => {
  const value = usePosts(props.id);

  return (
    <View style={styles.container}>
      {value ? (
        <DetailContainer
          data={value}
          id={props.id}
          title={props.title}
          image={props.image}
        />
      ) : (
        <Loading />
      )}
    </View>
  );
};

export default Detail;
