// @ts-ignore
import AppLovinMAX from 'react-native-applovin-max';
import Purchases from 'react-native-purchases';

let listener: any | undefined;
let time: any | undefined;
let retry: number = 0;

export default {
  loadInterstitial: function () {
    listener = AppLovinMAX;
    listener.addEventListener('OnInterstitialLoadedEvent', () => {
      retry = 0;
    });
    listener.addEventListener('OnInterstitialLoadFailedEvent', () => {
      time = setTimeout(() => {
        this.callAd();
      }, Math.pow(2, Math.min(6, retry)) * 1000);
    });
    listener.addEventListener('OnInterstitialClickedEvent', () => {});
    listener.addEventListener('OnInterstitialDisplayedEvent', () => {
      this.callAd();
    });
    listener.addEventListener('OnInterstitialAdFailedToDisplayEvent', () => {});
    listener.addEventListener('OnInterstitialHiddenEvent', () => {});
    this.callAd();
  },
  removeEventListener: function () {
    listener.removeEventListener('OnInterstitialLoadedEvent', () => {});
    listener.removeEventListener('OnInterstitialLoadFailedEvent', () => {});
    listener.removeEventListener('OnInterstitialClickedEvent', () => {});
    listener.removeEventListener('OnInterstitialDisplayedEvent', () => {});
    listener.removeEventListener(
      'OnInterstitialAdFailedToDisplayEvent',
      () => {},
    );
    listener.removeEventListener('OnInterstitialHiddenEvent', () => {});
    if (time !== undefined) {
      clearTimeout(time);
    }
    listener = undefined;
  },
  callAd: function () {
    if (listener !== undefined) {
      listener.loadInterstitial('70d414d580dc0549');
    }
  },
  showInterstitial: function () {
    Purchases.getPurchaserInfo().then((PurchaseInfo) => {
      if (typeof PurchaseInfo.entitlements.active.Pro !== 'undefined') {
        if (listener !== undefined) {
          this.removeEventListener();
        }
      } else {
        if (listener !== undefined) {
          if (listener.isInterstitialReady('70d414d580dc0549')) {
            listener.showInterstitial('70d414d580dc0549');
          }
          this.removeEventListener();
        }
      }
    });
  },
};
