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
exports.UserModel = void 0;
const database_1 = require("../config/database");
class UserModel {
    static create(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(userData);
            const query = 'INSERT INTO users (name, email, password, user_type) VALUES ($1, $2, $3, $4) RETURNING name, email, user_type';
            const values = [userData.name, userData.email, userData.password, userData.user_type];
            const { rows } = yield database_1.pool.query(query, values);
            return rows[0];
        });
    }
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const { rows } = yield database_1.pool.query('SELECT * FROM users');
            return rows;
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM users WHERE id = $1';
            const { rows } = yield database_1.pool.query(query, [id]);
            return rows[0] || null;
        });
    }
    static findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM users WHERE email = $1';
            const { rows } = yield database_1.pool.query(query, [email]);
            return rows[0] || null;
        });
    }
}
exports.UserModel = UserModel;
