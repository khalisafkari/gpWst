import MMKVStorage from 'react-native-mmkv-storage';

const postsId = new MMKVStorage.Loader().withInstanceID('postsId').initialize();

const historyId = new MMKVStorage.Loader()
  .withInstanceID('historyId')
  .initialize();

export {postsId, historyId};
