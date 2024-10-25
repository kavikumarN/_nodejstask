import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { pool } from '../config/database';
import { jwtConfig } from '../config/jwt.config';
import { TokenPayload, Tokens, RefreshToken } from '../types/auth.types';
import { User } from '../types/users.types';

export class TokenService {
  static generateTokens(user: User): Tokens {
    const payload: TokenPayload = {
      userId: user.id,
      email: user.email,
      userType: user.user_type
    };

    const accessToken = jwt.sign(payload, jwtConfig.accessToken.secret, {
      expiresIn: jwtConfig.accessToken.expiresIn,
    });

    const refreshToken = jwt.sign(payload, jwtConfig.refreshToken.secret, {
      expiresIn: jwtConfig.refreshToken.expiresIn,
    });

    return { accessToken, refreshToken };
  }

  static async saveRefreshToken(userId: number, refreshToken: string): Promise<void> {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days from now

    const query = `
      INSERT INTO refresh_tokens (user_id, token, expires_at)
      VALUES ($1, $2, $3)
    `;

    await pool.query(query, [userId, refreshToken, expiresAt]);
  }

  static async removeRefreshToken(token: string): Promise<void> {
    const query = 'DELETE FROM refresh_tokens WHERE token = $1';
    await pool.query(query, [token]);
  }

  static async removeUserRefreshTokens(userId: number): Promise<void> {
    const query = 'DELETE FROM refresh_tokens WHERE user_id = $1';
    await pool.query(query, [userId]);
  }

  static verifyAccessToken(token: string): TokenPayload {
    try {
      return jwt.verify(token, jwtConfig.accessToken.secret) as TokenPayload;
    } catch (error) {
      throw new Error('Invalid access token');
    }
  }

  static async verifyRefreshToken(token: string): Promise<TokenPayload> {
    try {
      const payload = jwt.verify(token, jwtConfig.refreshToken.secret) as TokenPayload;
      
      // Check if token exists in database
      const query = `
        SELECT * FROM refresh_tokens 
        WHERE token = $1 AND expires_at > NOW()
      `;
      const { rows } = await pool.query(query, [token]);
      
      if (rows.length === 0) {
        throw new Error('Refresh token not found or expired');
      }

      return payload;
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }
}

