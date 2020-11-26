import {useCallback, useEffect, useRef, useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import {Alert, ToastAndroid} from 'react-native';

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  offlineAccess: true,
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
        await GoogleSignin.hasPlayServices({
          showPlayServicesUpdateDialog: true,
        });
        await GoogleSignin.signIn();
        const {accessToken, idToken} = await GoogleSignin.getTokens();
        const google = await auth().signInWithCredential(
          auth.GoogleAuthProvider.credential(idToken, accessToken),
        );
        if (typeof google !== 'undefined') {
          onChange();
        }
        ToastAndroid.show('success', ToastAndroid.LONG);
      } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          Alert.alert('Error', 'SIGN_IN_CANCELLED');
        } else if (error.code === statusCodes.IN_PROGRESS) {
          Alert.alert('Error', 'IN_PROGRESS');
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          Alert.alert('Error', 'PLAY_SERVICES_NOT_AVAILABLE');
        } else {
          Alert.alert('Error', 'Contact Developer');
          console.log(JSON.stringify(error));
        }
      }
    })();
  }, [onChange]);

  return {initializing, user, gLogin};
};

export default useAccount;
