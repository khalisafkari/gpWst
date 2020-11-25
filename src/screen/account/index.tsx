import React from 'react';
import {View} from 'react-native';
import {useAccount} from '@utils/hook';
import {GoogleSigninButton} from '@react-native-community/google-signin';
import AccountList from '@component/AccountList';
import styles from './styles';

interface props {
  componentId: string;
}

const Account: React.FC<props> = (props) => {
  const {initializing, user, gLogin} = useAccount();

  if (initializing) {
    return null;
  }

  return (
    <View style={styles.container}>
      {user ? (
        <AccountList user={user} componentId={props.componentId} />
      ) : (
        <View style={styles.siginContainer}>
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            onPress={gLogin}
          />
        </View>
      )}
    </View>
  );
};

export default Account;
