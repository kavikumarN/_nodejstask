import bcrypt from 'bcrypt';
import { UserModel } from '../models/userModel';
import { TokenService } from './tokenService';
import { CreateUserDto } from '../types/users.types';
import { Tokens } from '../types/auth.types';

export class AuthService {
  static async register(userData: CreateUserDto): Promise<Tokens> {
    // Check if user exists
    const existingUser = await UserModel.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    userData.password = hashedPassword;
    // Create user
    const user = await UserModel.create(userData);

    // Generate tokens
    const tokens = TokenService.generateTokens(user);

    return tokens;
  }

  static async login(email: string, password: string): Promise<Tokens> {
    // Find user
    const user = await UserModel.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Generate new tokens
    const tokens = TokenService.generateTokens(user);

    return tokens;
  }

  static async refresh(refreshToken: string): Promise<Tokens> {
    // Verify refresh token
    const payload = await TokenService.verifyRefreshToken(refreshToken);

    // Find user
    const user = await UserModel.findById(payload.userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Remove old refresh token
    await TokenService.removeRefreshToken(refreshToken);

    // Generate new tokens
    const tokens = TokenService.generateTokens(user);

    // Save new refresh token
    await TokenService.saveRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  static async logout(refreshToken: string): Promise<void> {
    await TokenService.removeRefreshToken(refreshToken);
  }
}
