import {
  Navigation,
  LayoutComponent,
  LayoutStackChildren,
  LayoutTabsChildren,
} from 'react-native-navigation';
import analytics from '@react-native-firebase/analytics';
import Icon from 'react-native-vector-icons/AntDesign';
import Purchases from 'react-native-purchases';
// @ts-ignore
import AppLovinMAX from 'react-native-applovin-max';
import {useCallback, useEffect} from 'react';

export default {
  component: function (layout: LayoutComponent): LayoutStackChildren {
    return {
      component: {
        name: 'com.bk2020.' + layout.name,
        options: layout.options,
        passProps: layout.passProps,
      },
    };
  },
  stack: function (layout: LayoutComponent): LayoutTabsChildren {
    return {
      stack: {
        children: [this.component(layout)],
      },
    };
  },
  push: function (componentId: string, layout: LayoutComponent) {
    Navigation.push(componentId, this.component(layout));
  },
  init: function () {
    Navigation.events().registerAppLaunchedListener(() => {
      Navigation.setRoot({
        root: {
          ...this.component({
            name: 'splash',
          }),
        },
      });
    });
  },
  tabs: function () {
    Navigation.setRoot({
      root: {
        bottomTabs: {
          children: [
            this.stack({
              name: 'home',
              options: {
                bottomTab: {
                  icon: Icon.getImageSourceSync('home', 25),
                },
              },
            }),
            this.stack({
              name: 'list',
              options: {
                bottomTab: {
                  icon: Icon.getImageSourceSync('appstore-o', 25),
                },
                topBar: {
                  rightButtons: [
                    {
                      id: 'info-search',
                      icon: Icon.getImageSourceSync('search1', 20),
                    },
                  ],
                },
              },
            }),
            this.stack({
              name: 'bookmark',
              options: {
                bottomTab: {
                  icon: Icon.getImageSourceSync('book', 25),
                },
              },
            }),
            this.stack({
              name: 'setting',
              options: {
                bottomTab: {
                  icon: Icon.getImageSourceSync('setting', 25),
                },
              },
            }),
          ],
        },
      },
    });
  },
  pixabay: function () {
    Navigation.setRoot({
      root: {
        bottomTabs: {
          children: [
            this.stack({
              name: 'homepixabay',
              options: {
                bottomTab: {
                  icon: Icon.getImageSourceSync('home', 25),
                },
              },
            }),
            this.stack({
              name: 'pixabay.bookmark',
              options: {
                bottomTab: {
                  icon: Icon.getImageSourceSync('book', 25),
                },
              },
            }),
            this.stack({
              name: 'pixabay.setting',
              options: {
                bottomTab: {
                  icon: Icon.getImageSourceSync('setting', 25),
                },
              },
            }),
          ],
        },
      },
    });
  },
  themes: function () {
    Navigation.setDefaultOptions({
      layout: {
        backgroundColor: '#1e222b',
      },
      statusBar: {
        backgroundColor: '#1e222b',
        hideWithTopBar: false,
      },
      topBar: {
        background: {
          color: '#262b36',
        },
        backButton: {
          color: '#fff',
        },
        title: {
          color: '#fff',
          alignment: 'fill',
          fontSize: 14,
        },
        rightButtonColor: '#fff',
        leftButtonColor: '#fff',
      },
      bottomTab: {
        selectedIconColor: '#fff',
      },
      bottomTabs: {
        tabsAttachMode: 'onSwitchToTab',
        backgroundColor: '#262b36',
        titleDisplayMode: 'alwaysHide',
      },
    });
  },
  useSearch: function (componentId: string) {
    const onCall = useCallback(() => {
      const subscriptions = Navigation.events().registerNavigationButtonPressedListener(
        ({buttonId}) => {
          if (buttonId === 'info-search') {
            this.push(componentId, {
              name: 'advanced',
              options: {
                topBar: {
                  title: {
                    text: 'SEARCH',
                  },
                  leftButtons: [
                    {
                      id: 'info-close',
                      icon: Icon.getImageSourceSync('close', 20),
                    },
                  ],
                },
                bottomTabs: {
                  visible: false,
                },
              },
            });
          }
        },
      );

      return () => {
        subscriptions.remove();
      };
    }, [componentId]);
    useEffect(onCall, []);
  },
  useCloseAdvance: function (componentId: string) {
    const onCall = useCallback(() => {
      const subscriptions = Navigation.events().registerNavigationButtonPressedListener(
        ({buttonId}) => {
          if (buttonId === 'info-close') {
            Navigation.pop(componentId);
          }
        },
      );
      return () => {
        subscriptions.remove();
      };
    }, [componentId]);
    useEffect(onCall, []);
  },
  iapRegistery: function () {
    Purchases.setDebugLogsEnabled(__DEV__);
    Purchases.setup('HEUlXdbXAIzCriOnmwtSgMQFWPCwmJcF');
  },
  adsInitialize: function () {
    AppLovinMAX.initialize(
      'ioiA26xeiE7sp2y_ooxmzkBikQXzCG2GIIv3T2VKprroz_-gccPp6TZXuZbivFqOP2a3n02TC9W5yDJK3O4QGm',
      () => {},
    );
  },
  getPurchase: function () {},
};

Navigation.events().registerComponentDidAppearListener(
  async ({componentType, componentName}) => {
    if (componentType === 'Component') {
      await analytics().logScreenView({
        screen_class: componentName,
        screen_name: componentName,
      });
    }
  },
);
