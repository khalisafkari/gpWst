import React from 'react';
import {Pressable, Text, View} from 'react-native';
import styles from './styles';

interface props {
  text: string;
}

const ViewMore = (props: props) => {
  const [btn, setBtn] = React.useState<boolean>(true);

  const showBtn = () => {
    if (btn) {
      setBtn(false);
    } else {
      setBtn(true);
    }
  };

  const onText = React.useCallback(() => {
    return (
      <View>
        <Text
          style={[
            styles.text,
            {
              height: btn ? 60 : '100%',
            },
          ]}>
          {props.text}
        </Text>
      </View>
    );
  }, [btn, props.text]);

  return (
    <View style={styles.container}>
      <Pressable onPress={showBtn} style={styles.btnContainer}>
        {onText()}
      </Pressable>
    </View>
  );
};

export default ViewMore;
