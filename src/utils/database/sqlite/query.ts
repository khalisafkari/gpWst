import SQLite from 'react-native-sqlite-storage';
export type init = 'bookmark' | 'history';
export const dropTable: boolean = false;

export interface queryInit {
  id: string;
  title?: string;
  image?: string;
}

export const queryInit = (init: init = 'bookmark'): string => {
  return (
    'CREATE TABLE if not EXISTS ' +
    init +
    '(' +
    'id text PRIMARy KEY,' +
    'title text not NULL,' +
    'image text not null,' +
    'create_at timestamp not NULL DEFAULT CURRENT_TIMESTAMP' +
    ')'
  );
};
export const dropQueryInit = (init: init = 'bookmark'): string =>
  `drop table if exists ${init}`;

export const checkIf = (init: init) => {
  return `select * from ${init}  where id = ?`;
};

export const isInsert = (init: init) => {
  return `insert into ${init} (id, title, image) values (?,?,?)`;
};

export const isAll = (init: init) => {
  return `select * from ${init} order by create_at DESC`;
};

const errorCB = () => {};
const succesCB = () => {};

const createTable = (tx: SQLite.Transaction) => {
  if (dropTable) {
    tx.executeSql(dropQueryInit('history'));
    tx.executeSql(dropQueryInit('bookmark'));
  }
  tx.executeSql(queryInit('bookmark'), [], succesCB, errorCB);
  tx.executeSql(queryInit('history'), [], succesCB, errorCB);
};

export default async (db: SQLite.SQLiteDatabase): Promise<void> => {
  return await db.transaction(createTable).then(() => {});
};
