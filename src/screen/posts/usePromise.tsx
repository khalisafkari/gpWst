import React from 'react';
import {getPosts} from 'westmanga-extensions';

const usePromise = (url: string) => {
  const [state, setState] = React.useState<getPosts | any>();
  React.useEffect(() => {
    let isMounted = true;

    new Promise((resolve, reject) => {
      getPosts(url).then(resolve).catch(reject);
    }).then((results) => {
      if (isMounted) {
        setState(results);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [url]);
  return state;
};

export default usePromise;
