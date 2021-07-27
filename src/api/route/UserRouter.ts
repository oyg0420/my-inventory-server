import { Router } from 'express';
import { UserController } from '../../controllers';

const router = Router();

router.post('/sign_in', UserController.signIn);
router.post('/sign_up', UserController.signUp);

export default router;
