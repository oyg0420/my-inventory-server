import axios from 'axios';
import CryptoJS from 'crypto-js';
import errorGenerator from '../errors/errorGenerator';

const SECRET_KEY = 'AQAAAAAvuB4bRl/3tvB1d5u1YGhuUBaNeVU8i36hW/ng0M/Low==';
const ACCEESS_KEY = '010000000098e60bb0f531bb0b5bb4d65d0d7f824149780f917c09b3c1dfd8c07937d0256d';
const CUSTOMER_ID = 1836463;

type HeaderSignatureConfig = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  timeStamp: string;
};

export const getHeaderOptionsForAds = (config: HeaderSignatureConfig) => {
  const { timeStamp } = config;
  return {
    'X-Timestamp': timeStamp,
    'X-API-KEY': ACCEESS_KEY,
    'X-API-SECRET': SECRET_KEY,
    'X-CUSTOMER': CUSTOMER_ID,
    'X-Signature': getSignatureForAds(config),
  };
};

export const getSignatureForAds = (config: HeaderSignatureConfig) => {
  const { method, url, timeStamp } = config;
  const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, SECRET_KEY);
  hmac.update(timeStamp + '.' + method + '.' + url);

  return hmac.finalize().toString(CryptoJS.enc.Base64);
};

export const getHeaderOptionForShopping = () => {
  return {
    'X-Naver-Client-Id': 'Oa_vNtpvEILJ4egvcRhs',
    'X-Naver-Client-Secret': '9VUnV_mHnH',
  };
};

export const getHtml = async (url: string, params: { query: string }) => {
  try {
    const result = await axios.get(url, {
      params: { query: params.query },
    });
    return result.data;
  } catch (err) {
    errorGenerator(err.message);
  }
};
