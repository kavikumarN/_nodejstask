import { config } from 'dotenv';

config();

export const jwtConfig = {
  accessToken: {
    secret: process.env.JWT_ACCESS_SECRET || 'sampleaccesssecrect',
    expiresIn: '15m',
  },
  refreshToken: {
    secret: process.env.JWT_REFRESH_SECRET || 'samplerefreshsecrect',
    expiresIn: '7d',
  }
};