import { UserModel } from '../models/userModel';
import { User, CreateUserDto } from '../types/users.types';

export class UserService {
  static async createUser(userData: CreateUserDto): Promise<User> {
    return await UserModel.create(userData);
  }

  static async getAllUsers(): Promise<User[]> {
    return await UserModel.findAll();
  }

  static async getUserById(id: number): Promise<User | null> {
    return await UserModel.findById(id);
  }
}