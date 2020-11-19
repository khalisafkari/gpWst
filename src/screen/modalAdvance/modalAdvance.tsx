import React from 'react';
import {Animated, View} from 'react-native';
import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/AntDesign';
import Search from '@component/search';
import BtnAdvance from 'component/btnAdvance';
import styles from './styles';
import Genre from 'component/genre';

const ModalAdvance = (props: any) => {
  const refTop = React.useRef<any>();
  const showBtn = React.useRef<Animated.Value>(new Animated.Value(0)).current;
  const [value, setValue] = React.useState<string>('');
  const [selectGenre, setGenre] = React.useState<string | null>(null);
  const showMenu = React.useCallback(() => {
    Icon.getImageSource('circledowno', 20).then((icons) => {
      Navigation.mergeOptions(props.componentId, {
        topBar: {
          rightButtons: [
            {
              id: 'close-modal',
              icon: icons,
            },
          ],
        },
      });
    });
  }, [props.componentId]);
  const onCallBack = React.useCallback(() => {
    const listener = {
      componentDidAppear: function () {
        showMenu();
        refTop.current = Navigation.events().registerNavigationButtonPressedListener(
          ({buttonId}) => {
            if (buttonId === 'close-modal') {
              Navigation.dismissModal(props.componentId);
            }
          },
        );
      },
      componentDidDisappear: function () {
        if (refTop.current != null) {
          refTop.current.remove();
        }
      },
    };
    const subscriber = Navigation.events().registerComponentListener(
      listener,
      props.componentId,
    );
    return () => {
      subscriber.remove();
    };
  }, [props.componentId, showMenu]);

  React.useEffect(onCallBack, []);

  const onValueInput = (input: string) => {
    if (input.length === 0) {
      Animated.timing(showBtn, {
        duration: 200,
        useNativeDriver: true,
        toValue: 0,
      }).start();
    } else {
      Animated.timing(showBtn, {
        duration: 200,
        useNativeDriver: true,
        toValue: 1,
      }).start();
    }
    setValue(input);
  };

  const onSearch = React.useCallback(() => {
    if (value.length > 1 || selectGenre != null) {
      Navigation.push(props.componentId, {
        component: {
          name: 'com.bk2020.search',
          passProps: {
            search: value,
            genre: selectGenre,
          },
          options: {
            topBar: {
              title: {
                fontSize: 15,
                text: value.length > 1 ? `/s: ${value}` : '',
              },
              subtitle: {
                text: selectGenre ? `/g: ${selectGenre}` : '',
              },
            },
          },
        },
      });
    } else {
    }
  }, [props.componentId, selectGenre, value]);

  const choiseGenre = React.useCallback(
    ({show, genre}) => {
      if (show) {
        Animated.timing(showBtn, {
          duration: 200,
          useNativeDriver: true,
          toValue: 1,
        }).start();
        setGenre(genre);
      } else {
        Animated.timing(showBtn, {
          duration: 200,
          useNativeDriver: true,
          toValue: 0,
        }).start();
        setGenre(genre);
      }
    },
    [showBtn],
  );

  return (
    <View style={styles.contaner}>
      <Search onValue={onValueInput} />
      <Genre showMenu={choiseGenre} />
      <BtnAdvance
        cancel={() => {
          Navigation.dismissModal(props.componentId);
        }}
        save={onSearch}
        hide={showBtn}
      />
    </View>
  );
};

export default ModalAdvance;
