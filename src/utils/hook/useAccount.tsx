import {useCallback, useEffect, useRef, useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';

GoogleSignin.configure({
  webClientId:
    '962368346883-n15r43fojc0sob0ngtks8mjpdc9uk9m0.apps.googleusercontent.com',
});

const useAccount = () => {
  const [initializing, setInitializing] = useState<boolean>(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const isMounted = useRef<boolean>(true);
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const listener = useCallback(
    // eslint-disable-next-line no-shadow
    (user: FirebaseAuthTypes.User | null) => {
      if (isMounted.current && initializing) {
        setInitializing(false);
        setUser(user);
      }
    },
    [initializing],
  );

  const onChange = useCallback(() => {
    return auth().onAuthStateChanged(listener);
  }, [listener]);
  useEffect(onChange, []);

  const gLogin = useCallback(() => {
    (async () => {
      try {
        await GoogleSignin.hasPlayServices();
        const {idToken} = await GoogleSignin.signIn();
        const credentitial = auth.GoogleAuthProvider.credential(idToken);
        await auth().signInWithCredential(credentitial);
        onChange();
      } catch (error) {
        console.log(error);
      }
    })();
  }, [onChange]);

  return {initializing, user, gLogin};
};

export default useAccount;
