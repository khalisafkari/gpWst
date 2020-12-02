import React, {useCallback} from 'react';
import {View} from 'react-native';
import styles from './styles';
import MenuSettingItem from '@component/menuSettingItem';
import InAppReview from 'react-native-in-app-review';

interface props {
  componentId: string;
}

const Setting: React.FC<props> = (props) => {
  const onSendRating = useCallback(() => {
    const timeout = setTimeout(() => {
      InAppReview.RequestInAppReview();
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <MenuSettingItem
        id={'account'}
        componentId={props.componentId}
        title={'Account'}
        icon={'user'}
      />
      <MenuSettingItem
        id={'history'}
        componentId={props.componentId}
        title={'history'}
        icon={'book'}
      />
      <MenuSettingItem
        id={'faq'}
        componentId={props.componentId}
        title={'faq'}
        icon={'infocirlceo'}
      />
      <MenuSettingItem
        id={'privacy'}
        componentId={props.componentId}
        title={'Privacy policy'}
        icon={'infocirlceo'}
      />
      <MenuSettingItem
        id={'privacy'}
        componentId={props.componentId}
        title={'Berikan Rating'}
        icon={'star'}
        onPress={onSendRating}
      />
    </View>
  );
};

export default Setting;
