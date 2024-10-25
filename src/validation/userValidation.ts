import Joi from 'joi';
import { User } from '../types/users.types';

// User validation schemas
export const userSchemas = {
  createUser: Joi.object({
    name: Joi.string()
      .min(2)
      .max(50)
      .required()
      .messages({
        'string.min': 'Name should be at least 2 characters long',
        'string.max': 'Name should not exceed 50 characters',
        'any.required': 'Name is required'
      }),
    
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required'
      }),
    
    password: Joi.string()
      .min(8)
      .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
      .required()
      .messages({
        'string.min': 'Password should be at least 8 characters long',
        'string.pattern.base': 'Password must contain at least one letter and one number',
        'any.required': 'Password is required'
      }),
    
    user_type: Joi.string()
      .messages({
        'any.only': 'Invalid user type'
      })
  }),

  login: Joi.object({
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required'
      }),
    
    password: Joi.string()
      .required()
      .messages({
        'any.required': 'Password is required'
      })
  })
};


