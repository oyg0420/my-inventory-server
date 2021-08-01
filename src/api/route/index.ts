import { Router } from 'express';
import { fetchKeyword } from '../../services/KeywordService';
import UserRouter from '../route/UserRouter';
import ProductRouter from './ProductRouter';

const router = Router();
router.get('/keywords', fetchKeyword);
router.use('/users', UserRouter);
router.use('/products', ProductRouter);

export default router;
