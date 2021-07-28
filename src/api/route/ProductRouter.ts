import { Router } from 'express';
import { ProductController } from '../../controllers';

const router = Router();
router.post('/create', ProductController.create);
router.put('/update', ProductController.update);
router.get('/:id', ProductController.fetch);
router.get('/', ProductController.fetchList);
router.delete('/:id', ProductController.remove);

export default router;
