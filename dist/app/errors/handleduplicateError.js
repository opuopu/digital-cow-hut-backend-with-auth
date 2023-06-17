'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
function handleDuplicateKeyError(error) {
  return {
    success: false,
    statusCode: 409,
    message: error.message,
    stack: error.stack,
  }
}
exports.default = handleDuplicateKeyError
