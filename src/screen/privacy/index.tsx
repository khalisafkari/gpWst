import React from 'react';
import {View} from 'react-native';
import {WebView} from 'react-native-webview';
import styles from './styles';
import privacy from 'utils/html/privacy';

const PrivacyPolicy: React.FC = () => {
  return (
    <View style={styles.container}>
      <WebView source={{html: privacy()}} />
    </View>
  );
};

export default PrivacyPolicy;
