"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = exports.ValidationType = void 0;
var ValidationType;
(function (ValidationType) {
    ValidationType["BODY"] = "body";
    ValidationType["PARAMS"] = "params";
    ValidationType["QUERY"] = "query";
})(ValidationType || (exports.ValidationType = ValidationType = {}));
const validateRequest = (schema, type = ValidationType.BODY) => {
    return (req, res, next) => {
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
exports.validateRequest = validateRequest;
