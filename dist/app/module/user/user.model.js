'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const mongoose_1 = require('mongoose')
const userSchema = new mongoose_1.Schema({
  phoneNumber: {
    type: String,
    required: true,
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
})
// userSchema.pre<IUser>('save', async function (next) {
//   const isExist = await user.aggregate([
//     {
//       $match: {
//         PhoneNumber: this.phoneNumber,
//       },
//     },
//   ])
//   if (isExist.length > 0) {
//     const error = new mongoose.Error('')
//     throw handleDuplicateKeyError(error)
//   }
//   next()
// })
const user = (0, mongoose_1.model)('user', userSchema)
exports.default = user
