import './registery';
import {Navigation} from 'react-native-navigation';
import analytics from '@react-native-firebase/analytics';

Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'com.splash',
      },
    },
  });
});

Navigation.events().registerComponentDidAppearListener(
  async ({componentName, componentType}) => {
    if (componentType === 'Component') {
      await analytics().logScreenView({
        screen_name: componentName,
        screen_class: componentName,
      });
    }
  },
);
