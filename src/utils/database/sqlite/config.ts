import {utils} from '@react-native-firebase/app';
import SQLite from 'react-native-sqlite-storage';
import query from './query';
import {AppState, AppStateStatus} from 'react-native';

SQLite.DEBUG(false);
SQLite.enablePromise(true);
let db: SQLite.SQLiteDatabase | undefined;

const openDB = async () => {
  if (db) {
    return db;
  }
  const database = await SQLite.openDatabase({
    location: 'default',
    name: utils.FilePath.LIBRARY_DIRECTORY + '/westmanga.db',
  });
  await query(database);
  db = database;
  return database;
};

const closeDatabase = () => {
  db?.close();
  db = undefined;
};

let appState: AppStateStatus = 'active';
const App = (state: AppStateStatus) => {
  if (appState === 'active' && state.match(/inactive|background/)) {
    closeDatabase();
  }
  appState = state;
};

AppState.addEventListener('change', App);
AppState.removeEventListener('change', App);

export default () => {
  if (db !== undefined) {
    return Promise.resolve(db);
  }
  return openDB();
};
