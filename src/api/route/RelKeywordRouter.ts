import { Router } from 'express';
import RelKeywordController from '../../controllers/RelKeywordController';

const router = Router();

router.get('/keywordtools', RelKeywordController.fetch);

export default router;
