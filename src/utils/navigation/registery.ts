import {Navigation} from 'react-native-navigation';
import Splash from '@screen/splash';
import Home from '@screen/home';
import Setting from '@screen/setting';
import List from '@screen/list';
import Bookmark from '@screen/bookmark';
import Post from '@screen/post';
import FullImage from '@screen/fullImage';
import Reader from '@screen/reader';
import Advanced from '@screen/advanced';
import Search from '@screen/search';
import History from '@screen/history';
import Account from '@screen/account';

Navigation.registerComponent('com.bk2020.splash', () => Splash);
Navigation.registerComponent('com.bk2020.home', () => Home);
Navigation.registerComponent('com.bk2020.list', () => List);
Navigation.registerComponent('com.bk2020.advanced', () => Advanced);
Navigation.registerComponent('com.bk2020.search', () => Search);
Navigation.registerComponent('com.bk2020.bookmark', () => Bookmark);

Navigation.registerComponent('com.bk2020.post', () => Post);
Navigation.registerComponent('com.bk2020.fullimage', () => FullImage);
Navigation.registerComponent('com.bk2020.reader', () => Reader);

Navigation.registerComponent('com.bk2020.setting', () => Setting);
Navigation.registerComponent('com.bk2020.account', () => Account);
Navigation.registerComponent('com.bk2020.history', () => History);
