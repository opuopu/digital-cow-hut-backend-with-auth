'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const config_1 = __importDefault(require('../../config'))
const handleapiError_1 = __importDefault(require('../errors/handleapiError'))
const handlecastError_1 = __importDefault(require('../errors/handlecastError'))
const handlevalidation_1 = __importDefault(
  require('../errors/handlevalidation')
)
const globalErrorHandler = (error, req, res, next) => {
  // handle validation error
  let statusCode = 500
  let message = 'internal server error'
  let erromessages = []
  if (
    (error === null || error === void 0 ? void 0 : error.name) ===
    'ValidationError'
  ) {
    const simplifiederror = (0, handlevalidation_1.default)(error)
    statusCode = simplifiederror.statusCode
    message = simplifiederror.message
    erromessages = simplifiederror.errormessages
  } else if (
    (error === null || error === void 0 ? void 0 : error.name) === 'CastError'
  ) {
    const simplifiederror = (0, handlecastError_1.default)(error)
    statusCode = simplifiederror.statusCode
    message = simplifiederror.message
    erromessages = simplifiederror.errormessages
  }
  // else if (error?.code === 11000) {
  //   const simplifiedError = handleDuplicateKeyError(error)
  //   statusCode = simplifiedError.statusCode
  //   message = simplifiedError.message
  //   erromessages = error.message
  //     ? [
  //         {
  //           path: '',
  //           message: message,
  //         },
  //       ]
  //     : []
  // }
  else if (error instanceof handleapiError_1.default) {
    statusCode = error === null || error === void 0 ? void 0 : error.statusCode
    message = error === null || error === void 0 ? void 0 : error.message
    erromessages = (error === null || error === void 0 ? void 0 : error.message)
      ? [
          {
            path: '',
            message:
              error === null || error === void 0 ? void 0 : error.message,
          },
        ]
      : []
  } else if (error instanceof Error) {
    message = error === null || error === void 0 ? void 0 : error.message
    erromessages = (error === null || error === void 0 ? void 0 : error.message)
      ? [
          {
            path: '',
            message:
              error === null || error === void 0 ? void 0 : error.message,
          },
        ]
      : []
  }
  res.status(statusCode).json({
    success: false,
    message,
    erromessages,
    stack:
      config_1.default.env !== 'production'
        ? error === null || error === void 0
          ? void 0
          : error.stack
        : undefined,
  })
  next()
}
exports.default = globalErrorHandler
