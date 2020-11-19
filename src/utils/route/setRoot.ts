import Icon from 'react-native-vector-icons/AntDesign';
import {Navigation} from 'react-native-navigation';

export const setPixabay = () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'com.bk2020.pixabay.home',
              options: {
                topBar: {},
              },
            },
          },
        ],
      },
    },
  });
};

export default async () => {
  Navigation.setRoot({
    root: {
      bottomTabs: {
        children: [
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'com.bk2020.home',
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: await Icon.getImageSource('home', 25),
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'com.bk2020.list',
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: await Icon.getImageSource('layout', 25),
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: 'com.bk2020.bookmark',
                  },
                },
              ],
              options: {
                bottomTab: {
                  icon: await Icon.getImageSource('book', 25),
                },
              },
            },
          },
        ],
      },
    },
  });
};
