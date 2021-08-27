import { Router } from 'express';
import UserRouter from '../route/UserRouter';
import ProductRouter from './ProductRouter';
import KeywordRouter from './KeywordRouter';
import RelKeywordRouter from './RelKeywordRouter';

const router = Router();
router.use('/keywords', KeywordRouter);
router.use('/users', UserRouter);
router.use('/products', ProductRouter);
router.use('/relKeywords', RelKeywordRouter);

export default router;
