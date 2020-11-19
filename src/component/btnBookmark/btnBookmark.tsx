import React from 'react';
import {Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {sql} from '@utils/database';

interface props {
  id: string;
  title: string;
  image: string;
}

const BtnBookmark = (props: props) => {
  const [status, setStatus] = React.useState<boolean>(false);
  const onPressItem = () => {
    if (status) {
      sql.delId(props.id).then((resuls) => {
        if (resuls.insertId === undefined) {
          setStatus(false);
        }
      });
    } else {
      sql.setId(props.id, props.title, props.image).then((resuls) => {
        if (resuls.insertId > 0) {
          setStatus(true);
        }
      });
    }
  };

  React.useEffect(() => {
    sql.getId(props.id).then((status) => {
      if (status !== undefined) {
        setStatus(true);
      } else {
        setStatus(false);
      }
    });
  }, [props.id]);

  return (
    <Pressable onPress={onPressItem}>
      <Icon name={'book'} size={20} color={status ? '#ee0000' : '#fff'} />
    </Pressable>
  );
};

export default BtnBookmark;
