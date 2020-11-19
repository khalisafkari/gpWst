import SQLite from 'react-native-sqlite-storage';
import {AppState, AppStateStatus} from 'react-native';
import config from '@utils/database/sqlite/config';
import paginations from '@utils/database/pagination';
let db: SQLite.SQLiteDatabase | undefined;

let appState: AppStateStatus = 'active';

const sql = {
  getId: async function (id: string) {
    try {
      const [connection] = await getDB().then((db) =>
        db.executeSql('select * from bookmark where id = ?', [id]),
      );
      return connection.rows.item(connection.rows.length - 1);
    } catch (e) {
      return Promise.reject(e);
    }
  },
  setId: async function (id: string, title: string, image: string) {
    try {
      const [connection] = await getDB().then((db) =>
        db.executeSql('insert into bookmark (id,title,image) values (?,?,?)', [
          id,
          title,
          image,
        ]),
      );
      return connection;
    } catch (e) {
      return Promise.reject(e);
    }
  },
  delId: async function (id: string) {
    try {
      const [connection] = await getDB().then((db) =>
        db.executeSql('delete from bookmark WHERE id = ?', [id]),
      );
      return connection;
    } catch (e) {
      return Promise.reject(e);
    }
  },
  all: async function (page?: number | any) {
    try {
      const [connection] = await getDB().then((db) =>
        db.executeSql('SELECT * FROM bookmark ORDER BY create_at DESC'),
      );
      const todos = [];
      for (let i = 0; i < connection.rows.length; i++) {
        todos.push(connection.rows.item(i));
      }
      const p: number = page > 1 ? page : 1;
      return paginations(todos, p, 10);
    } catch (e) {
      return Promise.reject(e);
    }
  },
};

const getDB = async function () {
  if (db !== undefined) {
    return Promise.resolve(db);
  }
  return openDB();
};

const openDB = async function (): Promise<SQLite.SQLiteDatabase> {
  SQLite.DEBUG(false);
  SQLite.enablePromise(true);
  if (db) {
    return db;
  }
  const database = await SQLite.openDatabase({
    name: 'loveheaven.sqlite',
    location: 'default',
  });
  await config(database);
  db = database;
  return database;
};

const closeUI = () => {
  if (db === undefined) {
    return;
  }
  db.close();
  db = undefined;
};
const updateUI = (state: AppStateStatus) => {
  if (appState == 'active' && state.match(/inactive|background/)) {
    closeUI();
  }
  appState = state;
};

AppState.addEventListener('change', updateUI);
export default sql;
