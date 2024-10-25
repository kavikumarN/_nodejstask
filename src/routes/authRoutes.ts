import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { validateRequest } from '../middleware/validator';
import { userSchemas } from '../validation/userValidation';

const router = Router();

router.post(
  '/register',
//   validateRequest(userSchemas.createUser),
  AuthController.register
);

router.post(
  '/login',
//   validateRequest(userSchemas.login),
  AuthController.login
);

// router.post('/refresh', AuthController.refresh);
router.post('/logout', AuthController.logout);

export default router;