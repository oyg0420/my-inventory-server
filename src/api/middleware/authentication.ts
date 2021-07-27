import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import errorGenerator from '../../errors/errorGenerator';

const BLACK_LIST = ['/users/sign_in', '/users/sign_up'];

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  if (BLACK_LIST.includes(req.originalUrl)) {
    return next();
  }

  const token = req.header('Authentication');
  if (!token) {
    return errorGenerator({ statusCode: 401 });
  }
  try {
    jwt.verify(token, process.env.JWS_SECRETE);
    next();
  } catch (err) {
    return errorGenerator({ statusCode: 401 });
  }
};

export default verifyAuthToken;
