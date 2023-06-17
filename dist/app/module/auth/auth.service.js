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
const handleapiError_1 = __importDefault(require('../../errors/handleapiError'))
const user_model_1 = __importDefault(require('../user/user.model'))
const createAuthUser = users =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.create(users)
    if (!result) {
      throw new handleapiError_1.default(
        http_status_1.default.BAD_REQUEST,
        'something went wrong'
      )
    }
    return result
  })
exports.default = createAuthUser
