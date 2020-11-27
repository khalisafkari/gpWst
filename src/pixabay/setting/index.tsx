import React from 'react';
import {View} from 'react-native';
import MenuSettingItem from 'component/menuSettingItem';

interface props {
  componentId: string;
}

const SettingPixabay: React.FC<props> = (props) => {
  return (
    <View>
      <MenuSettingItem
        id={'pixabay.iap'}
        componentId={props.componentId}
        title={'BUY UNLOCK BOOKMARK'}
        icon={'shoppingcart'}
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

export default SettingPixabay;
