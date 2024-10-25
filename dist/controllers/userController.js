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
exports.UserController = void 0;
const userService_1 = require("../services/userService");
class UserController {
    static createUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userService_1.UserService.createUser(req.body);
                res.status(201).json(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getAllUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userService_1.UserService.getAllUsers();
                res.json(users);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getUserById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const user = yield userService_1.UserService.getUserById(id);
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
                res.json(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.UserController = UserController;
