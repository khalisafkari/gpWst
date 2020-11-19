import SQLite from 'react-native-sqlite-storage';
const dropTable: boolean = false;
const dropBookmark: string = 'drop table if exists bookmark';
const bookmark: string = `create table if not exists bookmark  (
    id text primary key,
    title text not null,
    image text not null,
    create_at timestamp not null default current_timestamp
);`;

const buildDatabase = (tx: SQLite.Transaction): void => {
  if (dropTable) {
    tx.executeSql(dropBookmark);
  }
  tx.executeSql(bookmark);
};

export default async (db: SQLite.SQLiteDatabase): Promise<void> => {
  return await db.transaction(buildDatabase).then(() => {});
};
