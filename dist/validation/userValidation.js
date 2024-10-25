"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchemas = void 0;
const joi_1 = __importDefault(require("joi"));
// User validation schemas
exports.userSchemas = {
    createUser: joi_1.default.object({
        name: joi_1.default.string()
            .min(2)
            .max(50)
            .required()
            .messages({
            'string.min': 'Name should be at least 2 characters long',
            'string.max': 'Name should not exceed 50 characters',
            'any.required': 'Name is required'
        }),
        email: joi_1.default.string()
            .email()
            .required()
            .messages({
            'string.email': 'Please provide a valid email address',
            'any.required': 'Email is required'
        }),
        password: joi_1.default.string()
            .min(8)
            .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
            .required()
            .messages({
            'string.min': 'Password should be at least 8 characters long',
            'string.pattern.base': 'Password must contain at least one letter and one number',
            'any.required': 'Password is required'
        }),
        user_type: joi_1.default.string()
            .messages({
            'any.only': 'Invalid user type'
        })
    }),
    login: joi_1.default.object({
        email: joi_1.default.string()
            .email()
            .required()
            .messages({
            'string.email': 'Please provide a valid email address',
            'any.required': 'Email is required'
        }),
        password: joi_1.default.string()
            .required()
            .messages({
            'any.required': 'Password is required'
        })
    })
};
