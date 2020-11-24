import {useCallback, useEffect, useRef, useState} from 'react';
import {getPosts} from 'westmanga-extensions';

const usePosts = (url: string) => {
  const isMounted = useRef<boolean>(true);
  const [state, setState] = useState<getPosts | null>(null);
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const onFetch = useCallback(() => {
    getPosts(url).then((results) => {
      if (isMounted.current) {
        setState(results);
      }
    });
  }, [url]);

  useEffect(onFetch, []);

  return state;
};

export default usePosts;
