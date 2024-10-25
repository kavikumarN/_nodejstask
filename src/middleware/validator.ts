import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';

export enum ValidationType {
  BODY = 'body',
  PARAMS = 'params',
  QUERY = 'query'
}

export const validateRequest = (
  schema: Schema,
  type: ValidationType = ValidationType.BODY
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[type], {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errors = error.details.map((err) => ({
        field: err.path.join('.'),
        message: err.message
      }));

      return res.status(400).json({
        status: 'error',
        errors
      });
    }

    next();
  };
};