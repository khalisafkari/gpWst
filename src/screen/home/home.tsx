import React from 'react';
import {Alert, ScrollView} from 'react-native';
import Slide from '@component/slide';
import styles from './styles';
import {Home as hApi, HomeResults} from 'westmanga-extensions';
import List from 'component/list';
import History from '@component/history';
import Loading from '@component/loading';

const Home = (props: any) => {
  const [slide, setSlide] = React.useState<HomeResults[]>([]);
  const [list, setList] = React.useState<HomeResults[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  const onCallBack = React.useCallback(() => {
    hApi({page: 1})
      .then((results: HomeResults[]) => {
        const todos: {
          list: HomeResults[];
          slide: HomeResults[];
        } = {
          slide: [],
          list: [],
        };
        for (let i of results) {
          if (!i.hot) {
            todos.slide.push(i);
          } else {
            todos.list.push(i);
          }
        }
        setList(todos.list);
        setSlide(todos.slide);
        setLoading(false);
      })
      .catch(() => {
        Alert.alert(
          'Failed Conntection',
          'Biasa terjadi untuk pengguna tel**m bentrok dengan CF bagi yang gak tau CF cari di google',
        );
      });
  }, []);

  React.useEffect(onCallBack, []);

  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Slide componentId={props.componentId} state={slide} />
          <History componentId={props.componentId} />
          <List componentId={props.componentId} list={list} />
        </>
      )}
    </ScrollView>
  );
};

export default Home;
