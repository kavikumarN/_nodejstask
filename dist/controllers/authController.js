"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const authService_1 = require("../services/authService");
class AuthController {
    static register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tokens = yield authService_1.AuthService.register(req.body);
                res.cookie('refreshToken', tokens.refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
                });
                res.status(201).json({
                    message: 'Registration successful',
                    accessToken: tokens.accessToken
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const tokens = yield authService_1.AuthService.login(email, password);
                res.cookie('refreshToken', tokens.refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
                });
                res.json({
                    message: 'Login successful',
                    accessToken: tokens.accessToken
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static refresh(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const refreshToken = req.cookies.refreshToken;
                if (!refreshToken) {
                    return res.status(401).json({ message: 'Refresh token required' });
                }
                const tokens = yield authService_1.AuthService.refresh(refreshToken);
                res.cookie('refreshToken', tokens.refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
                });
                res.json({
                    accessToken: tokens.accessToken
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const refreshToken = req.cookies.refreshToken;
                if (refreshToken) {
                    yield authService_1.AuthService.logout(refreshToken);
                }
                res.clearCookie('refreshToken');
                res.json({ message: 'Logout successful' });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.AuthController = AuthController;
