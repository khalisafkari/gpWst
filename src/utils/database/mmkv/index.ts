import {postsId, historyId} from './config';
import paginations from '../pagination';

const pId = {
  getId: async function (id: string): Promise<boolean> {
    try {
      const unit = await postsId.getBoolAsync(id);
      if (unit != null) {
        return true;
      } else {
        throw 'error';
      }
    } catch (e) {
      return Promise.reject(e);
    }
  },
  setId: async function (id: string): Promise<boolean> {
    try {
      await this.getId(id);
      return false;
    } catch (e) {
      const insert = await postsId.setBoolAsync(id, true);
      return insert;
    }
  },
};

// @ts-ignore
const hId = {
  getId: async function (id: string): Promise<any> {
    try {
      const unit = await historyId.getMapAsync(id);
      if (unit != null) {
        return unit;
      } else {
        throw 'error';
      }
    } catch (e) {
      return Promise.reject(e);
    }
  },
  setId: async function (
    id: string,
    title: string,
    image: string,
    last_title: string,
  ): Promise<any> {
    try {
      const data: any = await this.getId(id);
      const update = await historyId.setMapAsync(id, {
        id: data.id,
        title: data.title,
        image: data.image,
        last_title,
        create_at: Date.now(),
      });
      return update;
    } catch (e) {
      try {
        const data = await historyId.setMapAsync(id, {
          id,
          title,
          image,
          last_title,
          create_at: Date.now(),
        });
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    }
  },
  all: async function (pages?: number | any, min?: number | any) {
    try {
      const data = await historyId.indexer.maps.getKeys();
      const page = paginations(data, pages ? pages : 1, min);
      return page;
    } catch (e) {
      return Promise.reject(e);
    }
  },
};

export {pId, hId};
