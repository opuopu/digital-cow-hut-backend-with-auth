'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const http_status_1 = __importDefault(require('http-status'))
const config_1 = __importDefault(require('../../config'))
const jwthelper_1 = __importDefault(require('../../shared/jwthelper'))
const handleapiError_1 = __importDefault(require('../errors/handleapiError'))
const auth =
  (...roles) =>
  (req, res, next) =>
    __awaiter(void 0, void 0, void 0, function* () {
      try {
        const token = req.cookies.refreshToken
        if (!token) {
          throw new handleapiError_1.default(
            http_status_1.default.UNAUTHORIZED,
            'you are not authorized'
          )
        }
        const verifyToken = jwthelper_1.default.verifyToken(
          token,
          config_1.default.jwt.secret
        )
        if (!verifyToken) {
          throw new handleapiError_1.default(
            http_status_1.default.NOT_FOUND,
            'invalid token'
          )
        }
        req.user = verifyToken
        if (roles.length && !roles.includes(verifyToken.role)) {
          throw new handleapiError_1.default(
            http_status_1.default.FORBIDDEN,
            'authorization failed ! unauthorized user'
          )
        }
        return next()
      } catch (error) {
        next(error)
      }
    })
exports.default = auth
