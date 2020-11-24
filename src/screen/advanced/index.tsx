import React, {useCallback, useRef, useState, useEffect} from 'react';
import {Animated, View, Pressable as P, Text} from 'react-native';
import root from 'utils/navigation/root';
import styles from './styles';
import InputSearch from 'component/inputSearch';
import GenreList from 'component/genreList';

interface props {
  componentId: string;
}

const Pressable = Animated.createAnimatedComponent(P);

const Advanced: React.FC<props> = (props) => {
  const [text, setText] = useState<string>('');
  const identify = useRef<Animated.Value>(new Animated.Value(0)).current;
  const [select, setSelect] = useState<string | null>(null);
  const isMounted = useRef<boolean>(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  root.useCloseAdvance(props.componentId);

  const showBtn = useCallback((): void => {
    Animated.timing(identify, {
      useNativeDriver: true,
      toValue: 1,
      duration: 500,
    }).start();
  }, [identify]);

  const hideBtn = useCallback((): void => {
    Animated.timing(identify, {
      useNativeDriver: true,
      toValue: 0,
      duration: 500,
    }).start();
  }, [identify]);

  const onSetText = useCallback(
    // eslint-disable-next-line no-shadow
    (text: string) => {
      if (text.length !== 0 && text.length > 2) {
        showBtn();
      } else {
        hideBtn();
      }
      setText(text);
    },
    [hideBtn, showBtn],
  );

  const onChoise = useCallback(
    (item: string | null) => {
      if (item !== null) {
        setSelect(item);
        showBtn();
      } else {
        setSelect(null);
        hideBtn();
      }
    },
    [hideBtn, showBtn],
  );

  const onSearchLauch = useCallback(() => {
    const timeout = setTimeout(() => {
      if (select !== null && text.length > 1) {
        root.push(props.componentId, {
          name: 'search',
          options: {
            bottomTabs: {
              visible: false,
            },
            topBar: {
              title: {
                text: text,
              },
              subtitle: {
                text: select,
              },
            },
          },
          passProps: {
            search: text,
            genre: select,
          },
        });
      } else if (select !== null) {
        root.push(props.componentId, {
          name: 'search',
          options: {
            bottomTabs: {
              visible: false,
            },
            topBar: {
              title: {
                text: select,
              },
            },
          },
          passProps: {
            search: null,
            genre: select,
          },
        });
      } else if (text.length > 1) {
        root.push(props.componentId, {
          name: 'search',
          options: {
            bottomTabs: {
              visible: false,
            },
            topBar: {
              title: {
                text: text,
              },
            },
          },
          passProps: {
            search: text,
            genre: null,
          },
        });
      }
    }, 100);
    return () => clearTimeout(timeout);
  }, [props.componentId, select, text]);

  const translateY = identify.interpolate({
    inputRange: [0, 1],
    outputRange: [56, 0],
  });

  return (
    <View style={styles.container}>
      <InputSearch
        textInput={{
          value: text,
          onChangeText: onSetText,
        }}
      />
      <GenreList onPress={onChoise} />
      <Pressable
        onPress={onSearchLauch}
        style={[styles.btn, {transform: [{translateY}]}]}>
        <Text style={styles.btnTitle}>Search</Text>
      </Pressable>
    </View>
  );
};

export default Advanced;
