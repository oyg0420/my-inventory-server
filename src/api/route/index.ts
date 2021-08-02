import { Router } from 'express';
import { fetchKeyword } from '../../services/KeywordService';
import UserRouter from '../route/UserRouter';
import ProductRouter from './ProductRouter';
import KeywordRouter from './KeywordRouter';

const router = Router();
router.use('/keywords', KeywordRouter);
router.use('/users', UserRouter);
router.use('/products', ProductRouter);

export default router;
