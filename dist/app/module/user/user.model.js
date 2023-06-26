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
const bcrypt_1 = __importDefault(require('bcrypt'))
const mongoose_1 = require('mongoose')
const config_1 = __importDefault(require('../../../config'))
const userSchema = new mongoose_1.Schema(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    role: {
      type: String,
      enum: ['seller', 'buyer'],
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    address: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
      default: 0,
    },
    income: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (_doc, ret) {
        delete ret.password
        return ret
      },
    },
  }
)
userSchema.methods.isUserExist = function (phoneNumber) {
  return __awaiter(this, void 0, void 0, function* () {
    const isUserExist = yield user.findOne(
      { phoneNumber },
      { password: 1, role: 1, phoneNumber: 1 }
    )
    return isUserExist
  })
}
userSchema.methods.isPassWordMatched = function (givenPassword, savedPassword) {
  return __awaiter(this, void 0, void 0, function* () {
    const password = yield bcrypt_1.default.compare(
      givenPassword,
      savedPassword
    )
    return password
  })
}
userSchema.pre('save', function (next) {
  return __awaiter(this, void 0, void 0, function* () {
    this.password = yield bcrypt_1.default.hash(
      this.password,
      Number(config_1.default.bcrypt_salt_round)
    )
    next()
  })
})
const user = (0, mongoose_1.model)('user', userSchema)
exports.default = user
