import errorGenerator from '../errors/errorGenerator';
import { getHeaderOptionForShopping, getHeaderOptionsForAds } from '../api/API';
import axios from 'axios';
import parserHTML from '../modules/parseHTML';
import { uniq } from 'lodash';

type KeywordItem = {
  relKeyword: string;
  monthlyPcQcCnt: number;
  monthlyMobileQcCnt: number;
  compIdx: string;
};

type GetKeywordsToolResponse = {
  keywordList: KeywordItem[];
};

type Item = {
  category1: string;
  category2: string;
  category3: string;
  category4: string;
  lprice: number;
};

type GetSearchShopResponse = {
  total: number;
  items: Item[];
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
      params: { query: keyword.replace(' ', ''), start: 2, sort: 'sim', display: 10 },
      headers: getHeaderOptionForShopping(),
    });
    let prices = 0;
    result.data.items.forEach(item => {
      prices += Number(item.lprice);
    });

    const categories = result.data.items.map(item => {
      let category = '';
      if (item.category1) {
        category += item.category1;
      }
      if (item.category2) {
        category += `/${item.category2}`;
      }
      if (item.category3) {
        category += `/${item.category3}`;
      }
      if (item.category4) {
        category += `/${item.category4}`;
      }
      return category;
    });

    return { total: result.data.total, categories: uniq(categories) };
  } catch (err) {
    errorGenerator(err.message);
  }
};

export const fetchKeyword = async (keyword: string) => {
  return await Promise.all([
    getKeywordsTool(keyword),
    getSearchShop(keyword),
    parserHTML({
      url: process.env.NAVER_REQUEST_URL,
      query: `frm=NVSHCHK&query=${keyword}&pagingIndex=1&pagingSize=80`,
      selectors: [
        { key: 'keyword', value: process.env.NAVER_QUERY_SELECTOR_KEYWORD },
        {
          key: 'price',
          value: process.env.NAVER_QUERY_SELECTOR_PRICE,
        },
        {
          key: 'etc',
          value: process.env.NAVER_QUERY_SELECTOR_ETC,
        },
        {
          key: 'image',
          value: process.env.NAVER_QUERY_SELECTOR_IMAGE,
          type: 'image',
        },
      ],
    }),
  ]);
};
