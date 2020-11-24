import {useCallback, useEffect, useRef, useState} from 'react';
import {HomeResults} from 'westmanga-extensions';

const useList = (props: HomeResults[]) => {
  const isMounted = useRef<boolean>(true);
  const [state, setState] = useState<HomeResults[] | any>([]);
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const onCallBack = useCallback(() => {
    const todos: HomeResults[] = [];
    for (let i = 0; i < props.length; i++) {
      if (props[i].hot) {
        todos.push(props[i]);
      }
    }
    if (isMounted.current) {
      setState(todos);
    }
  }, [props]);

  useEffect(onCallBack, []);
  return state;
};

export default useList;
