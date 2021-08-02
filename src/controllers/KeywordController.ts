import express, { Request, Response, NextFunction } from 'express';
import { fetchKeyword } from '../services/KeywordService';

const fetch = async (req: Request, res: Response, next: NextFunction) => {
  const { keyword } = req.query;
  const formattedKeyword = keyword.toString().replace(' ', '');
  try {
    const [keywordItem, totalCount, relKeywords] = await fetchKeyword(formattedKeyword);
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

export default {
  fetch,
};
