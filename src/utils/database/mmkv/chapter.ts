import MMKVStorage from 'react-native-mmkv-storage';
import {useCallback, useEffect, useRef, useState} from 'react';

const chapter = {
  init: function (): MMKVStorage.API {
    return new MMKVStorage.Loader().withInstanceID('chapter').initialize();
  },
  setChapter: function (id: string | any): Promise<boolean> {
    return new Promise((resolve) => {
      this.init()
        .setBoolAsync(id, true)
        .then((value) => (value === null ? resolve(false) : resolve(true)));
    });
  },
  getChapter: function (id: string): Promise<boolean> {
    return new Promise((resolve) => {
      this.init()
        .getBoolAsync(id)
        .then((value) => (value === null ? resolve(false) : resolve(value)));
    });
  },
  useChapter: function (id: string) {
    const isMounted = useRef<boolean>(true);
    const [state, setState] = useState<boolean>(false);

    useEffect(() => {
      return () => {
        isMounted.current = false;
      };
    }, []);

    const onCallBack = useCallback(() => {
      this.getChapter(id).then((results) => {
        if (isMounted.current) {
          setState(results);
        }
      });
    }, [id]);
    useEffect(onCallBack, []);

    const onSetValue = useCallback(() => {
      this.setChapter(id).then((results) => {
        if (isMounted.current) {
          setState(results);
        }
      });
    }, [id]);

    return {state, onSetValue};
  },
};

export default chapter;
