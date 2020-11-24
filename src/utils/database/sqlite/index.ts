import db from './config';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {init, queryInit, checkIf, isInsert, isAll} from './query';
import {useCallback, useEffect, useRef, useState} from 'react';

interface useFindBookmark {
  id: string;
  title: string | undefined;
  image: string | undefined;
}

export interface allItem extends useFindBookmark {
  create_at: any;
}

const database = {
  // eslint-disable-next-line no-shadow
  getId: async function (init: init, id: string) {
    try {
      const [item] = await db().then((sql) => {
        return sql.executeSql(checkIf(init), [id]);
      });
      return item.rows.length > 0;
    } catch (error) {
      throw new Error(error);
    }
  },
  // eslint-disable-next-line no-shadow
  push: function (init: init = 'history', query: queryInit) {
    this.getId(init, query.id).then(async (results) => {
      if (!results) {
        try {
          const [item] = await db().then((sql) => {
            return sql.executeSql(isInsert(init), [
              query.id,
              query.title,
              query.image,
            ]);
          });
          return item.insertId > 0;
        } catch (err) {
          throw new Error(err);
        }
      }
    });
  },
  // eslint-disable-next-line no-shadow
  del: function (init: init, id: string) {
    this.getId(init, id).then(async (results) => {
      if (results) {
        try {
          await db().then((sql) => {
            return sql.executeSql('delete from bookmark where id = ?', [id]);
          });
          return false;
        } catch (err) {
          throw new Error(err);
        }
      }
    });
  },
  useFindBookmark: function ({id, title, image}: useFindBookmark) {
    const isMounted = useRef(true);
    const [state, setState] = useState<boolean>(false);
    useEffect(() => {
      return () => {
        isMounted.current = false;
      };
    });
    const onFetch = useCallback(() => {
      this.getId('bookmark', id).then((results) => {
        if (isMounted.current) {
          setState(results);
        }
      });
    }, [id]);
    useEffect(onFetch, []);

    const addBookmark = useCallback(() => {
      if (state) {
        this.del('bookmark', id);
        setState(false);
      } else {
        this.push('bookmark', {
          id,
          title,
          image,
        });
        setState(true);
      }
      this.del('bookmark', id);
    }, [id, image, state, title]);

    return {state, addBookmark};
  },
  // eslint-disable-next-line no-shadow
  getAll: async function (init: init) {
    try {
      const todos: allItem[] = [];
      const [item] = await db().then((sql) => {
        return sql.executeSql(isAll(init));
      });
      for (let i = 0; i < item.rows.length; i++) {
        todos.push(item.rows.item(i));
      }
      return todos;
    } catch (err) {
      throw new Error(err);
    }
  },
};

export default database;
