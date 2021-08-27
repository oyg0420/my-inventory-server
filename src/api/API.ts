import axios from 'axios';
import CryptoJS from 'crypto-js';
import errorGenerator from '../errors/errorGenerator';

type HeaderSignatureConfig = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  timeStamp: string;
};

export const getHeaderOptionsForAds = (config: HeaderSignatureConfig) => {
  const { timeStamp } = config;
  return {
    'X-Timestamp': timeStamp,
    'X-API-KEY': process.env.ACCEESS_KEY,
    'X-API-SECRET': process.env.SECRET_KEY,
    'X-CUSTOMER': process.env.CUSTOMER_ID,
    'X-Signature': getSignatureForAds(config),
  };
};

export const getSignatureForAds = (config: HeaderSignatureConfig) => {
  const { method, url, timeStamp } = config;
  const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, process.env.SECRET_KEY);
  hmac.update(timeStamp + '.' + method + '.' + url);

  return hmac.finalize().toString(CryptoJS.enc.Base64);
};

export const getHeaderOptionForShopping = () => {
  return {
    'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
    'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET,
  };
};

export const getHtml = async (url: string, params: { query: string }) => {
  try {
    const result = await axios.get(url, {
      params: { query: params.query, frm: 'NVSHATC' },
    });
    return result.data;
  } catch (err) {
    errorGenerator(err.message);
  }
};
