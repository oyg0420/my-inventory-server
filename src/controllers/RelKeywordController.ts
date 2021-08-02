import express, { Request, Response, NextFunction } from 'express';
import { getKeywordsTool } from '../services/RelKeywordService';

const fetch = async (req: Request, res: Response, next: NextFunction) => {
  const { keyword } = req.query;
  const formattedKeyword = keyword.toString().replace(' ', '');
  try {
    const keywordList = await getKeywordsTool(formattedKeyword);

    return res.status(200).json({
      result: keywordList,
    });
  } catch (err) {
    next(err);
  }
};

export default {
  fetch,
};
