import {useCallback, useEffect, useRef, useState} from 'react';
import {Home, HomeResults} from 'westmanga-extensions';

const useHome = () => {
  const isMounted = useRef<boolean>(true);
  const [state, setState] = useState<HomeResults[] | any>(null);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const onCallBack = useCallback(() => {
    Home({}).then((results: HomeResults[]) => {
      if (isMounted.current && typeof results !== 'undefined') {
        setState(results);
      }
    });
  }, []);

  useEffect(onCallBack, []);
  return state;
};

export default useHome;
