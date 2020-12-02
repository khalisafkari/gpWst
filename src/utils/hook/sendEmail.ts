import qs from 'qs';
import {Linking} from 'react-native';

interface sendEmail {
  subject: string;
  body: string | any;
}

const sendEmail = async (config: sendEmail): Promise<void> => {
  let url = 'mailto:westmanga@yahoo.com';
  const query = qs.stringify({
    subject: config.subject,
    body: config.body,
  });

  if (query.length) {
    url += `?${query}`;
  }
  const openURL = await Linking.canOpenURL(url);
  if (!openURL) {
    throw new Error('Provided URL can not be handled');
  }
  return Linking.openURL(url);
};

export default sendEmail;
