import errorGenerator from '../errors/errorGenerator';
import { getHeaderOptionForShopping, getHeaderOptionsForAds } from '../api/API';
import axios from 'axios';
import parserHTML from '../modules/parseHTML';

type KeywordItem = {
  relKeyword: string;
  monthlyPcQcCnt: number;
  monthlyMobileQcCnt: number;
  compIdx: string;
};

type GetKeywordsToolResponse = {
  keywordList: KeywordItem[];
};

type GetSearchShopResponse = {
  total: number;
};

const getKeywordsTool = async (keyword: string) => {
  try {
    const result = await axios.get<GetKeywordsToolResponse>('https://api.naver.com/keywordstool', {
      params: { hintKeywords: keyword.replace(' ', ''), showDetail: 1 },
      headers: getHeaderOptionsForAds({ url: '/keywordstool', method: 'GET', timeStamp: `${Date.now()}` }),
    });
    return {
      ...result.data.keywordList[0],
      relKeywords: result.data.keywordList
        .filter(keywordItem => keywordItem.relKeyword.replace(' ', '').includes(keyword))
        .map(keywordItem => keywordItem.relKeyword),
    };
  } catch (err) {
    errorGenerator(err.message);
  }
};

const getSearchShop = async (keyword: string) => {
  try {
    const result = await axios.get<GetSearchShopResponse>('https://openapi.naver.com/v1/search/shop.json', {
      params: { query: keyword.replace(' ', ''), start: 1, sort: 'sim' },
      headers: getHeaderOptionForShopping(),
    });
    return result.data.total;
  } catch (err) {
    errorGenerator(err.message);
  }
};

export const fetchKeyword = async (keyword: string) => {
  return await Promise.all([
    getKeywordsTool(keyword),
    getSearchShop(keyword),
    parserHTML({
      url: 'https://search.shopping.naver.com/search/all',
      query: keyword,
      selector: 'div.relatedTags_relation_srh__1CleC ul li a',
    }),
  ]);
};
