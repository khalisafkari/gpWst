import {Navigation} from 'react-native-navigation';
import Splash from '@screen/splash';
import Home from '@screen/home';
import Setting from '@screen/setting';
import Faq from '@screen/faq';
import PrivacyPolicy from '@screen/privacy';
import List from '@screen/list';
import Bookmark from '@screen/bookmark';
import Post from '@screen/post';
import Detail from '@screen/detail';
import Reader from '@screen/reader';
import Advanced from '@screen/advanced';
import Search from '@screen/search';
import History from '@screen/history';
import HomePixabay from 'pixabay/home';
import PostsPixabay from 'pixabay/posts';

Navigation.registerComponent('com.bk2020.splash', () => Splash);
Navigation.registerComponent('com.bk2020.home', () => Home);
Navigation.registerComponent('com.bk2020.list', () => List);
Navigation.registerComponent('com.bk2020.advanced', () => Advanced);
Navigation.registerComponent('com.bk2020.search', () => Search);
Navigation.registerComponent('com.bk2020.bookmark', () => Bookmark);

Navigation.registerComponent('com.bk2020.post', () => Post);
Navigation.registerComponent('com.bk2020.detail', () => Detail);
Navigation.registerComponent('com.bk2020.reader', () => Reader);

Navigation.registerComponent('com.bk2020.setting', () => Setting);
Navigation.registerComponent('com.bk2020.history', () => History);
Navigation.registerComponent('com.bk2020.faq', () => Faq);
Navigation.registerComponent('com.bk2020.privacy', () => PrivacyPolicy);

Navigation.registerComponent('com.bk2020.homepixabay', () => HomePixabay);
Navigation.registerComponent('com.bk2020.pixabay.posts', () => PostsPixabay);
