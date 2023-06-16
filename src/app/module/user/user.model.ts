import { Schema, model } from 'mongoose'
import { IUser, UserModel } from './user.interface'

const userSchema = new Schema<IUser, UserModel>({
  phoneNumber: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    enum: ['seller', 'buyer'],
  },
  password: {
    type: String,
    required: true,
    unique: true,
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

// userSchema.pre<IUser>('save', function (next) {
//   if (this.role === 'buyer') {
//     this.income = 0
//   } else if (this.role === 'seller') {
//     this.budget = 0
//   }
//   next()
// })

const user = model<IUser, UserModel>('user', userSchema)
export default user
