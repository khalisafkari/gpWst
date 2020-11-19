import {Navigation} from 'react-native-navigation';
import Home from '@screen/home';
import List from '@screen/list';
import ModalAdvance from '@screen/modalAdvance';
import Search from '@screen/search';
import Posts from '@screen/posts';
import ModalDetails from '@screen/modalDetails';
import Bookmark from '@screen/bookmark';
import History from '@screen/history';
import PostsView from '@screen/postsView';
import Splash from '@screen/splash';
import HomePixabay from 'pixabay/home';
import PostsPixabay from 'pixabay/posts';

//Pixabay
Navigation.registerComponent('com.bk2020.pixabay.home', () => HomePixabay);
Navigation.registerComponent('com.bk2020.pixabay.posts', () => PostsPixabay);

//Default
Navigation.registerComponent('com.splash', () => Splash);
Navigation.registerComponent('com.bk2020.home', () => Home);
Navigation.registerComponent('com.bk2020.list', () => List);
Navigation.registerComponent('com.bk2020.history', () => History);
Navigation.registerComponent('com.bk2020.modaladvance', () => ModalAdvance);
Navigation.registerComponent('com.bk2020.search', () => Search);
Navigation.registerComponent('com.bk2020.posts', () => Posts);
Navigation.registerComponent('com.bk2020.modaldetails', () => ModalDetails);
Navigation.registerComponent('com.bk2020.bookmark', () => Bookmark);
Navigation.registerComponent('com.bk2020.postsview', () => PostsView);

Navigation.setDefaultOptions({
  topBar: {
    rightButtonColor: '#fff',
    background: {
      color: '#262b36',
    },
    title: {
      color: '#fff',
    },
    backButton: {
      color: '#fff',
    },
  },
  layout: {
    backgroundColor: '#1e222b',
  },
  bottomTab: {
    selectedIconColor: 'white',
  },
  bottomTabs: {
    backgroundColor: '#262b36',
    titleDisplayMode: 'alwaysHide',
  },
});
