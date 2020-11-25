import React, {useCallback, useEffect, useRef, useState} from 'react';
import {ToastAndroid, View} from 'react-native';
import AccountItem from 'component/AccountItem';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import {utils} from '@react-native-firebase/app';
import root from 'utils/navigation/root';
import Purchases from 'react-native-purchases';

// `/westmanga/${props.user.email}/westmanga.db`,
// utils.FilePath.LIBRARY_DIRECTORY + '/westmanga.db'

interface props {
  componentId: string;
  user: FirebaseAuthTypes.User;
}

const AccountList: React.FC<props> = (props) => {
  const isMounted = useRef<boolean>(true);
  const [isBuy, setIsBuy] = useState<boolean>(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const onFirtsCall = useCallback(() => {
    Purchases.getPurchaserInfo().then((PurchaseInfo) => {
      if (typeof PurchaseInfo.entitlements.active.Pro !== 'undefined') {
        setIsBuy(false);
      }
    });
  }, []);

  useEffect(onFirtsCall, []);

  const onBackupDB = useCallback(() => {
    if (!isBuy) {
      ToastAndroid.show('Wait Backup....', ToastAndroid.SHORT);
      const reference = storage().ref(
        `/westmanga/${props.user.email}/westmanga.db`,
      );
      reference
        .putFile(utils.FilePath.LIBRARY_DIRECTORY + '/westmanga.db')
        .then(() => {
          ToastAndroid.show('Backup Success', ToastAndroid.LONG);
        })
        .catch(() => {
          ToastAndroid.show('Backup Failed', ToastAndroid.LONG);
        });
    } else {
      ToastAndroid.show('Required at PRO account', ToastAndroid.LONG);
    }
  }, [isBuy, props.user.email]);

  const onRestoreDB = useCallback(() => {
    if (!isBuy) {
      ToastAndroid.show('Wait Restore....', ToastAndroid.SHORT);
      const reference = storage().ref(
        `/westmanga/${props.user.email}/westmanga.db`,
      );
      reference
        .writeToFile(utils.FilePath.LIBRARY_DIRECTORY + '/westmanga.db')
        .then(() => {
          ToastAndroid.show('Restore Success', ToastAndroid.LONG);
        })
        .catch(() => {
          ToastAndroid.show('Restore Failed', ToastAndroid.LONG);
        });
    } else {
      ToastAndroid.show('Required at PRO account', ToastAndroid.LONG);
    }
  }, [isBuy, props.user.email]);

  const onRestoreBuy = useCallback(() => {
    ToastAndroid.show('Wait Restore...', ToastAndroid.SHORT);
    Purchases.getPurchaserInfo()
      .then((results) => {
        if (typeof results.entitlements.active.Pro !== 'undefined') {
          ToastAndroid.show('your subscriber is restored', ToastAndroid.LONG);
          setIsBuy(false);
        } else {
          ToastAndroid.show('subscriber not available', ToastAndroid.LONG);
        }
      })
      .catch(() => {});
  }, []);

  const onGoBuy = useCallback(() => {
    const timeout = setTimeout(() => {
      root.push(props.componentId, {
        name: 'buy',
        options: {
          topBar: {
            visible: false,
          },
          bottomTabs: {
            visible: false,
          },
        },
        passProps: {
          user: props.user,
        },
      });
    }, 100);
    return () => clearTimeout(timeout);
  }, [props.componentId, props.user]);

  const onLogout = useCallback(() => {
    return auth().signOut();
  }, []);

  return (
    <View>
      <AccountItem onPress={onBackupDB} title={'BACKUP'} icon={'upload'} />
      <AccountItem onPress={onRestoreDB} title={'RESTORE'} icon={'download'} />
      {isBuy ? (
        <AccountItem
          title={'Buy Pro'}
          icon={'shoppingcart'}
          onPress={onGoBuy}
        />
      ) : null}
      <AccountItem
        onPress={onRestoreBuy}
        title={'Restore Pro'}
        icon={'customerservice'}
      />
      <AccountItem title={'Logout'} icon={'logout'} onPress={onLogout} />
    </View>
  );
};

export default AccountList;
