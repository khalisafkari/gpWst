import React from 'react';
import {Text, View, Animated, Linking, Pressable, Alert} from 'react-native';
import location from 'westmanga-extensions';
import FastImage from 'react-native-fast-image';
import VersionCheck from 'react-native-version-check';
import styles from './styles';
import setRoot, {setPixabay} from '@utils/route/setRoot';

const Image = Animated.createAnimatedComponent(FastImage);

const Splash = () => {
  const [version, setVersion] = React.useState<string>('');
  const [update, setUpdate] = React.useState<boolean>(false);
  const [storeURL, setStoreURL] = React.useState<string>('');
  const logo = React.useRef<Animated.Value>(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(logo, {
        useNativeDriver: true,
        duration: 5000,
        toValue: 1,
      }),
    ).start();
  }, [logo]);

  const onFetchCountry = React.useCallback(() => {
    location()
      .then(({country}) => {
        if (country === 'Indonesia') {
          setRoot();
        } else {
          setPixabay();
        }
      })
      .catch(() => {
        Alert.alert('connection', 'error');
      });
  }, []);

  const onCallBack = React.useCallback(() => {
    VersionCheck.needUpdate().then(({storeUrl, isNeeded, latestVersion}) => {
      if (isNeeded) {
        setUpdate(isNeeded);
        setVersion(latestVersion);
        setStoreURL(storeUrl);
      } else {
        onFetchCountry();
      }
    });
  }, [onFetchCountry]);

  React.useEffect(onCallBack, []);

  const onFacebok = () => {
    Linking.openURL('https://www.facebook.com/tkhalis');
  };

  const onUpdate = () => {
    Linking.openURL(storeURL);
  };

  const rotate = logo.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image
          source={{
            uri:
              'https://westmanga.info/wp-content/uploads/2017/11/cropped-wtwrmark2-192x192.png',
          }}
          style={[
            styles.image,
            {
              transform: [
                {
                  rotate,
                },
              ],
            },
          ]}
        />
      </View>
      {update ? (
        <Pressable
          onLongPress={onFetchCountry}
          onPress={onUpdate}
          style={[styles.update]}>
          <Text style={styles.version}>update now</Text>
          <Text style={styles.desain}>
            version {VersionCheck.getCurrentVersion()}
            {' > '}
            {version}
          </Text>
        </Pressable>
      ) : null}
      <Pressable onPress={onFacebok}>
        <Text style={styles.version}>DEV by khalis</Text>
      </Pressable>
      <Text
        style={
          styles.desain
        }>{`version: ${VersionCheck.getCurrentVersion()}(${VersionCheck.getCurrentBuildNumber()}) | with Ads`}</Text>
    </View>
  );
};

export default Splash;
