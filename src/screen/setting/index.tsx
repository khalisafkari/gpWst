import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import MenuSettingItem from '@component/menuSettingItem';

interface props {
  componentId: string;
}

const Setting: React.FC<props> = (props) => {
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
    </View>
  );
};

export default Setting;
