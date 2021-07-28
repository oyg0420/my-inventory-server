import { Router } from 'express';
import UserRouter from '../route/UserRouter';
import ProductRouter from './ProductRouter';

const router = Router();

router.use('/users', UserRouter);
router.use('/products', ProductRouter);

export default router;
