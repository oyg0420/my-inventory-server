import { Router } from 'express';
import KeywordController from '../../controllers/KeywordController';

const router = Router();

router.get('/keywordtools', KeywordController.fetch);

export default router;
