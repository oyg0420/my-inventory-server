import express, { Request, Response, NextFunction } from 'express';
import { fetchKeyword } from '../services/KeywordService';

const fetch = async (req: Request, res: Response, next: NextFunction) => {
  const { keyword } = req.query;
  const formattedKeyword = keyword.toString().replace(' ', '');
  try {
    const [keywordItem, merchant, parsingData] = await fetchKeyword(formattedKeyword);
    let totalVolume = 0;

    if (Number(keywordItem.monthlyPcQcCnt) > 0) {
      totalVolume += Number(keywordItem.monthlyPcQcCnt);
    }

    if (Number(keywordItem.monthlyMobileQcCnt) > 0) {
      totalVolume += Number(keywordItem.monthlyMobileQcCnt);
    }

    return res.status(200).json({
      result: {
        keyword: keywordItem.relKeyword,
        relativeKeywords: parsingData.keyword,
        price: parsingData.price,
        etc: parsingData.etc,
        image: parsingData.image[0],
        searchVolumeWithPC: keywordItem.monthlyPcQcCnt,
        searchVolumeWithMobile: keywordItem.monthlyMobileQcCnt,
        totalVolume,
        totalCount: merchant.total,
        competition: Number((merchant.total / totalVolume).toFixed(3)),
        competitiveStrength: keywordItem.compIdx,
        category: merchant.categories[0],
      },
    });
  } catch (err) {
    next(err);
  }
};

export default {
  fetch,
};
