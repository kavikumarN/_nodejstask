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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = require("../models/userModel");
const tokenService_1 = require("./tokenService");
class AuthService {
    static register(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if user exists
            const existingUser = yield userModel_1.UserModel.findByEmail(userData.email);
            if (existingUser) {
                throw new Error('Email already registered');
            }
            const hashedPassword = yield bcrypt_1.default.hash(userData.password, 10);
            userData.password = hashedPassword;
            // Create user
            const user = yield userModel_1.UserModel.create(userData);
            // Generate tokens
            const tokens = tokenService_1.TokenService.generateTokens(user);
            return tokens;
        });
    }
    static login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            // Find user
            const user = yield userModel_1.UserModel.findByEmail(email);
            if (!user) {
                throw new Error('Invalid credentials');
            }
            // Verify password
            const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error('Invalid credentials');
            }
            // Generate new tokens
            const tokens = tokenService_1.TokenService.generateTokens(user);
            return tokens;
        });
    }
    static refresh(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            // Verify refresh token
            const payload = yield tokenService_1.TokenService.verifyRefreshToken(refreshToken);
            // Find user
            const user = yield userModel_1.UserModel.findById(payload.userId);
            if (!user) {
                throw new Error('User not found');
            }
            // Remove old refresh token
            yield tokenService_1.TokenService.removeRefreshToken(refreshToken);
            // Generate new tokens
            const tokens = tokenService_1.TokenService.generateTokens(user);
            // Save new refresh token
            yield tokenService_1.TokenService.saveRefreshToken(user.id, tokens.refreshToken);
            return tokens;
        });
    }
    static logout(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            yield tokenService_1.TokenService.removeRefreshToken(refreshToken);
        });
    }
}
exports.AuthService = AuthService;
