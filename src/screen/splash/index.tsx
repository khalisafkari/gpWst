import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Linking, Pressable, Text, View} from 'react-native';
import Image from 'react-native-fast-image';
import root from '@utils/navigation/root';
import location from 'westmanga-extensions';
import versions from 'react-native-version-check';
import styles from './styles';

interface props {
  componentId: string;
}

const Splash: React.FC<props> = () => {
  const [isNeeded, setIsNeeded] = useState<boolean>(false);
  const [latestVersion, setLatestVersion] = useState<string>(
    versions.getCurrentVersion(),
  );
  const isMounted = useRef<boolean>(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const onFetchCountry = useCallback(() => {
    const timeout = setTimeout(() => {
      location().then(({country}) => {
        if (country.match(/Indonesia/gi)) {
          root.tabs();
        } else {
          root.pixabay();
        }
      });
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  const onVersions = useCallback(() => {
    versions.needUpdate().then((results) => {
      if (isMounted.current) {
        if (results.isNeeded) {
          setIsNeeded(results.isNeeded);
          setLatestVersion(results.latestVersion);
        } else {
          onFetchCountry();
        }
      }
    });
  }, [onFetchCountry]);

  useEffect(onVersions, []);

  const onFacebok = useCallback(() => {
    Linking.openURL('https://www.facebook.com/tkhalis');
  }, []);

  const onUpdate = useCallback(() => {
    versions.getPlayStoreUrl().then((results) => {
      Linking.openURL(results);
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/icon.png')} style={styles.image} />
      </View>
      {isNeeded ? (
        <Pressable
          onLongPress={onFetchCountry}
          onPress={onUpdate}
          style={[styles.update]}>
          <Text style={styles.version}>update now</Text>
          <Text style={styles.desain}>
            version {versions.getCurrentVersion()}
            {' > '}
            {latestVersion}
          </Text>
        </Pressable>
      ) : null}
      <Pressable onPress={onFacebok}>
        <Text style={styles.version}>DEV by khalis</Text>
      </Pressable>
      <Text style={styles.desain}>
        {`version: ${versions.getCurrentVersion()}(${versions.getCurrentBuildNumber()}) | with Ads`}
      </Text>
    </View>
  );
};

export default Splash;
