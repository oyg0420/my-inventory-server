import errorGenerator from '../errors/errorGenerator';
import express, { Request, Response, NextFunction } from 'express';
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
      relKeywords: result.data.keywordList.map(keywordItem => keywordItem.relKeyword),
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

export const fetchKeyword = async (req: Request, res: Response, next: NextFunction) => {
  const { keyword } = req.query;
  const formattedKeyword = keyword.toString().replace(' ', '');
  try {
    const [keywordItem, totalCount, relKeywords] = await Promise.all([
      getKeywordsTool(formattedKeyword),
      getSearchShop(formattedKeyword),
      parserHTML({
        url: 'https://search.shopping.naver.com/search/all',
        query: formattedKeyword,
        selector: 'div.relatedTags_relation_srh__1CleC ul li a',
      }),
    ]);

    const totalVolume = keywordItem.monthlyPcQcCnt + keywordItem.monthlyMobileQcCnt;

    return res.status(200).json({
      result: {
        keyword: keywordItem.relKeyword,
        relativeKeywords: relKeywords,
        searchVolumeWithPC: keywordItem.monthlyPcQcCnt,
        searchVolumeWithMobile: keywordItem.monthlyMobileQcCnt,
        totalVolume,
        totalCount,
        competition: Number((totalCount / totalVolume).toFixed(3)),
        competitiveStrength: keywordItem.compIdx,
      },
    });
  } catch (err) {
    next(err);
  }
};
