import React, {useCallback} from 'react';
import {View} from 'react-native';
import {HomeResults} from 'westmanga-extensions';
import {useList} from 'utils/hook';
import Item from 'component/Item';
import styles from './styles';

interface props {
  componentId: string;
  list: HomeResults[];
}

const ListItem: React.FC<props> = (props) => {
  const value = useList(props.list);

  const onRenderItem = useCallback(
    (item, index) => {
      return <Item key={index} componentId={props.componentId} item={item} />;
    },
    [props.componentId],
  );

  return (
    <View style={styles.container}>
      {value ? value.map(onRenderItem) : null}
    </View>
  );
};

export default ListItem;
