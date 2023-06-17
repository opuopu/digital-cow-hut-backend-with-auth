'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const handleValidationError = err => {
  const errors = Object.values(err.errors).map(error => {
    return {
      path: error.path,
      message: error.message,
    }
  })
  const statuscode = 400
  return {
    statusCode: statuscode,
    message: 'validation error',
    errormessages: errors,
  }
}
exports.default = handleValidationError
