import { Router } from 'express';
import { UserController } from '../../controllers';

const router = Router();

router.use('/sign_in', UserController.signIn);
router.use('/sign_up', UserController.signUp);

export default router;
