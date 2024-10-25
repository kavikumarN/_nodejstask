import { pool } from '../config/database';
import { User, CreateUserDto } from '../types/users.types';

export class UserModel {
  static async create(userData: CreateUserDto): Promise<User> {
    console.log(userData);
    const query = 'INSERT INTO users (name, email, password, user_type) VALUES ($1, $2, $3, $4) RETURNING name, email, user_type';
    const values = [userData.name, userData.email, userData.password, userData.user_type];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async findAll(): Promise<User[]> {
    const { rows } = await pool.query('SELECT * FROM users');
    return rows;
  }

  static async findById(id: number): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE id = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0] || null;
  }

  static async findByEmail(email: String): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE email = $1';
    const { rows } = await pool.query(query, [email]);
    return rows[0] || null;
  }
}
