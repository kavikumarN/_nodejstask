"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConfig = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.jwtConfig = {
    accessToken: {
        secret: process.env.JWT_ACCESS_SECRET || 'sampleaccesssecrect',
        expiresIn: '15m',
    },
    refreshToken: {
        secret: process.env.JWT_REFRESH_SECRET || 'samplerefreshsecrect',
        expiresIn: '7d',
    }
};
