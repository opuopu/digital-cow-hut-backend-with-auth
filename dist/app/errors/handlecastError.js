"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (err) => {
    const errors = [
        { path: err.path, message: `Invalid ${err.path}: ${err.value}` },
    ];
    const statusCode = 400;
    return {
        statusCode: statusCode,
        message: 'cast error',
        errormessages: errors,
    };
};
exports.default = handleCastError;
