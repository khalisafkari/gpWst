import SQLite from 'react-native-sqlite-storage';
const dropTable: boolean = false;

const createTable = (tx: SQLite.Transaction) => {
  if (dropTable) {
    tx.executeSql('drop table if exists download_id');
    tx.executeSql('drop table if exists download_manga');
  }
};

export default async (db: SQLite.SQLiteDatabase): Promise<void> => {
  return await db.transaction(createTable).then(() => {});
};
