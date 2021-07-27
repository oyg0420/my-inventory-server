import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import { ErrorWithStatusCode } from './errorGenerator';

const globalErrorHandler: ErrorRequestHandler = (
  err: ErrorWithStatusCode,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { message, statusCode } = err;
  res.status(statusCode || 500).json({ code: statusCode || 500, message });
};

export default globalErrorHandler;
