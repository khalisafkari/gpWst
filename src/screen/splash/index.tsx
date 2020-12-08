import React, {useCallback, useEffect, useRef} from 'react';
import {Linking, Pressable, Text, View} from 'react-native';
import Image from 'react-native-fast-image';
import root from '@utils/navigation/root';
import styles from './styles';

interface props {
  componentId: string;
}

const Splash: React.FC<props> = () => {
  const isMounted = useRef<boolean>(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      root.tabs();
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  const onFacebok = useCallback(() => {
    Linking.openURL('https://www.facebook.com/tkhalis');
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/icon.png')} style={styles.image} />
      </View>
      <Pressable onPress={onFacebok}>
        <Text style={styles.version}>DEV by khalis</Text>
      </Pressable>
    </View>
  );
};

export default Splash;
