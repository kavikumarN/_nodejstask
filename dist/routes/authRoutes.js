"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
router.post('/register', 
//   validateRequest(userSchemas.createUser),
authController_1.AuthController.register);
router.post('/login', 
//   validateRequest(userSchemas.login),
authController_1.AuthController.login);
// router.post('/refresh', AuthController.refresh);
router.post('/logout', authController_1.AuthController.logout);
exports.default = router;
