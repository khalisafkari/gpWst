import React, {useCallback} from 'react';
import {SectionList, View} from 'react-native';
import {useHome} from 'utils/hook';
import styles from './styles';
import Slide from '@component/slide';
import Loading from '@component/loading';
import ListItem from '@component/listItem';

interface props {
  componentId: string;
}

const Home: React.FC<props> = (props) => {
  const value = useHome();

  const selections = [
    {
      data: [<Slide componentId={props.componentId} slide={value} />],
    },
    {
      data: [<ListItem componentId={props.componentId} list={value} />],
    },
  ];

  const keyExtractor = useCallback((_, index) => {
    return String(index);
  }, []);

  return (
    <View style={styles.container}>
      {value ? (
        <SectionList
          sections={selections}
          keyExtractor={keyExtractor}
          renderItem={({item}) => <View>{item}</View>}
        />
      ) : (
        <Loading />
      )}
    </View>
  );
};

export default Home;
