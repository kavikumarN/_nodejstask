import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
  user: "alts_admin",
  host: "localhost",
  database: "chatsystem",
  password: "admin_pass",
  port: parseInt(process.env.DB_PORT || '5433'),
});