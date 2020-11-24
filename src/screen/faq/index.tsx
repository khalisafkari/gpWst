import React from 'react';
import {View} from 'react-native';
import {WebView} from 'react-native-webview';
import faqjs from '@utils/html/faqjs';
import styles from './styles';

interface props {
  componentId: string;
}

const Faq: React.FC<props> = () => {
  return (
    <View style={styles.container}>
      <WebView source={{html: faqjs()}} />
    </View>
  );
};

export default Faq;
