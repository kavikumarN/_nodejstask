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
exports.TokenService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = require("../config/database");
const jwt_config_1 = require("../config/jwt.config");
class TokenService {
    static generateTokens(user) {
        const payload = {
            userId: user.id,
            email: user.email,
            userType: user.user_type
        };
        const accessToken = jsonwebtoken_1.default.sign(payload, jwt_config_1.jwtConfig.accessToken.secret, {
            expiresIn: jwt_config_1.jwtConfig.accessToken.expiresIn,
        });
        const refreshToken = jsonwebtoken_1.default.sign(payload, jwt_config_1.jwtConfig.refreshToken.secret, {
            expiresIn: jwt_config_1.jwtConfig.refreshToken.expiresIn,
        });
        return { accessToken, refreshToken };
    }
    static saveRefreshToken(userId, refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const expiresAt = new Date();
            expiresAt.setDate(expiresAt.getDate() + 7); // 7 days from now
            const query = `
      INSERT INTO refresh_tokens (user_id, token, expires_at)
      VALUES ($1, $2, $3)
    `;
            yield database_1.pool.query(query, [userId, refreshToken, expiresAt]);
        });
    }
    static removeRefreshToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'DELETE FROM refresh_tokens WHERE token = $1';
            yield database_1.pool.query(query, [token]);
        });
    }
    static removeUserRefreshTokens(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'DELETE FROM refresh_tokens WHERE user_id = $1';
            yield database_1.pool.query(query, [userId]);
        });
    }
    static verifyAccessToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, jwt_config_1.jwtConfig.accessToken.secret);
        }
        catch (error) {
            throw new Error('Invalid access token');
        }
    }
    static verifyRefreshToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = jsonwebtoken_1.default.verify(token, jwt_config_1.jwtConfig.refreshToken.secret);
                // Check if token exists in database
                const query = `
        SELECT * FROM refresh_tokens 
        WHERE token = $1 AND expires_at > NOW()
      `;
                const { rows } = yield database_1.pool.query(query, [token]);
                if (rows.length === 0) {
                    throw new Error('Refresh token not found or expired');
                }
                return payload;
            }
            catch (error) {
                throw new Error('Invalid refresh token');
            }
        });
    }
}
exports.TokenService = TokenService;
