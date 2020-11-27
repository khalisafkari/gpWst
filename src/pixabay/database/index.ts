import MMKVStorage from 'react-native-mmkv-storage';

const dabatase = {
  init: function (): MMKVStorage.API {
    return new MMKVStorage.Loader().withInstanceID('book').initialize();
  },
  setBookmark: function (id: string): Promise<boolean> {
    return new Promise((resolve) => {
      this.init()
        .setBoolAsync(id, true)
        .then((value) => (value === null ? resolve(false) : resolve(true)));
    });
  },
  delBookmark: function (id: string) {
    return new Promise((resolve) => {
      this.init()
        .setBoolAsync(id, false)
        .then((value) => (value === null ? resolve(false) : resolve(true)));
    });
  },
  getBookmark: function (id: string): Promise<any> {
    return new Promise((resolve) => {
      this.init()
        .getBoolAsync(id)
        .then((value) => (value === null ? resolve(false) : resolve(value)));
    });
  },
  getAll: function (): Promise<string[]> {
    return new Promise(async (resolve) => {
      const todos: string[] = [];
      const string = await this.init().indexer.booleans.getKeys();
      for (let i = 0; i < string.length; i++) {
        const data = await this.init().getBoolAsync(string[i]);
        if (data) {
          todos.push(string[i]);
        }
      }
      resolve(todos);
    });
  },
};

export default dabatase;
