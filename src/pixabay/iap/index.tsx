import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import Purchases, {PurchasesPackage} from 'react-native-purchases';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import root from 'utils/navigation/root';

interface props {
  componentId: string;
}

const IapPixabay: React.FC<props> = (props) => {
  const [product, setProduct] = useState<PurchasesPackage[]>([]);

  useEffect(() => {
    Navigation.mergeOptions(props.componentId, {
      topBar: {
        visible: false,
      },
    });
  }, [props.componentId]);

  useEffect(() => {
    Purchases.getOfferings().then((offering) => {
      if (
        offering.current !== null &&
        offering.current.availablePackages.length !== 0
      ) {
        setProduct(offering.current.availablePackages);
      }
    });
  }, []);

  const onPrivacy = useCallback(() => {
    const timeout = setTimeout(() => {
      root.push(props.componentId, {
        name: 'privacy',
        options: {
          topBar: {
            title: {
              text: 'PRIVACY POLICY',
            },
          },
          bottomTabs: {
            visible: false,
          },
        },
      });
    }, 100);
    return () => clearTimeout(timeout);
  }, [props.componentId]);

  const openFaq = useCallback(() => {}, []);

  const onBuy = useCallback(
    (item: PurchasesPackage) => {
      Purchases.purchasePackage(item)
        .then(() => {
          ToastAndroid.show('Thank you for subscribing', ToastAndroid.LONG);
          Navigation.pop(props.componentId);
        })
        .catch(() => {
          ToastAndroid.show('Purchase failed', ToastAndroid.LONG);
        });
    },
    [props.componentId],
  );

  const onClose = useCallback(() => {
    const timeout = setTimeout(() => {
      Navigation.pop(props.componentId);
    }, 100);
    return () => clearTimeout(timeout);
  }, [props.componentId]);

  const onRenderContent = useCallback(
    ({item, index}: {item: PurchasesPackage; index: number}) => {
      return (
        <ScrollView showsVerticalScrollIndicator={false} key={index}>
          <View style={styles.containerTitleItem}>
            <Text style={styles.containerTitleText}>{item.product.title}</Text>
            <Text style={styles.conteinerDescriptionText}>
              {item.product.description}
            </Text>
          </View>
          <View style={styles.containerItemDetail}>
            <Text style={styles.containerItemDetailLabel}>
              Ad-Free <Icon name={'checkcircle'} size={15} color={'green'} />
            </Text>
            <Text style={styles.containerItemDetailLabel}>
              ADD UNLIMITED BOOKMARK{' '}
              <Icon name={'checkcircle'} size={15} color={'green'} />
            </Text>
            <Text onPress={openFaq} style={styles.containerItemDetailLabel}>
              DLL (IN FAQ)
            </Text>
          </View>
          <Pressable
            onPress={() => onBuy(item)}
            style={styles.containerTitleItem}>
            <Text style={styles.containerTitleText}>
              {item.product.currency_code}
              {'. '}
              {item.product.price}
            </Text>
          </Pressable>
        </ScrollView>
      );
    },
    [onBuy, openFaq],
  );

  const keyExtractor = useCallback((_, index) => {
    return String(index);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onClose} style={styles.btnClose}>
          <Icon name={'close'} size={20} color={'#fff'} />
        </Pressable>
        <Text style={styles.titleHeader}>Unlock Everything</Text>
      </View>
      <View style={styles.center}>
        <FlatList
          keyExtractor={keyExtractor}
          data={product}
          renderItem={onRenderContent}
        />
      </View>
      <View style={styles.footer}>
        <Text style={styles.subscriptionDescription}>
          this subscription give you unlimited access & backup to our app
          content library. Your subscription will renew for the same plan lenght
          at the same price. By subscribing you agree to our Terms & Conditions
          and{' '}
          <Text style={styles.subscriptionPolicy} onPress={onPrivacy}>
            Privacy Policy
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default IapPixabay;
