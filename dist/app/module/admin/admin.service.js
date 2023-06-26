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
const config_1 = __importDefault(require('../../../config'))
const jwthelper_1 = __importDefault(require('../../../shared/jwthelper'))
const handleapiError_1 = __importDefault(require('../../errors/handleapiError'))
const admin_model_1 = __importDefault(require('./admin.model'))
const createadmin = payload =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_model_1.default.create(payload)
    return result
  })
// login admin
const loginadmin = payload =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, password } = payload
    const admins = new admin_model_1.default()
    const isUserExist = yield admins.isUserExist(phoneNumber)
    if (!isUserExist) {
      throw new handleapiError_1.default(
        http_status_1.default.NOT_FOUND,
        'admin not found'
      )
    }
    const { role } = isUserExist
    const ispasswordMatched = admins.isPassWordMatched(
      password,
      isUserExist.password
    )
    if (!ispasswordMatched) {
      throw new handleapiError_1.default(
        http_status_1.default.UNAUTHORIZED,
        'password is incorrect'
      )
    }
    const getadmin = yield admin_model_1.default.findOne(
      { phoneNumber: phoneNumber },
      { _id: 1 }
    )
    if (!getadmin) {
      throw new handleapiError_1.default(
        http_status_1.default.NOT_FOUND,
        'admin not found'
      )
    }
    // accessToken
    const accessToken = jwthelper_1.default.createToken(
      { id: getadmin.id, role: role },
      config_1.default.jwt.secret,
      {
        expiresIn: config_1.default.jwt.jwt_expires_in,
      }
    )
    const refreshToken = jwthelper_1.default.createToken(
      { id: getadmin.id, role: role },
      config_1.default.jwt.secret,
      {
        expiresIn: config_1.default.jwt.jwt_expires_in,
      }
    )
    return {
      accessToken,
      refreshToken,
    }
  })
const adminServices = {
  createadmin,
  loginadmin,
}
exports.default = adminServices
