import axios from 'axios';
import { getHeaderOptionsForAds } from '../api/API';
import errorGenerator from '../errors/errorGenerator';

type KeywordItem = {
  relKeyword: string;
  monthlyPcQcCnt: number;
  monthlyMobileQcCnt: number;
  monthlyAvePcClkCnt: number;
  monthlyAveMobileClkCnt: number;
  monthlyAvePcCtr: number;
  monthlyAveMobileCtr: number;
  plAvgDepth: number;
  compIdx: string;
};

type GetKeywordsToolResponse = {
  keywordList: KeywordItem[];
};

export const getKeywordsTool = async (keyword: string) => {
  try {
    const result = await axios.get<GetKeywordsToolResponse>('https://api.naver.com/keywordstool', {
      params: { hintKeywords: keyword.replace(' ', ''), showDetail: 1 },
      headers: getHeaderOptionsForAds({ url: '/keywordstool', method: 'GET', timeStamp: `${Date.now()}` }),
    });
    return result.data.keywordList;
  } catch (err) {
    errorGenerator(err.message);
  }
};
