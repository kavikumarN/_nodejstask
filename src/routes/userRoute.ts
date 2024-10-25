import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { AuthController } from '../controllers/authController';
import { validateRequest } from '../middleware/validator';
import { userSchemas } from '../validation/userValidation';
import { FileController } from '../controllers/fileController';
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const router = Router();

router.get('/user/:id', UserController.getAllUsers);
router.post('/upload',upload.single('file'), FileController.writeFileContent);
// router.get('/:id', UserController.getUserById);

export default router;