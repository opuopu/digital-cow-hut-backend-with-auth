import httpStatus from 'http-status'
import { Schema, model } from 'mongoose'
import Apierror from '../../errors/handleapiError'
import { IUser, UserModel } from './user.interface'

const userSchema = new Schema<IUser, UserModel>({
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

userSchema.pre<IUser>('save', async function (next) {
  const isExist = await user.aggregate([
    {
      $match: {
        PhoneNumber: this.phoneNumber,
      },
    },
  ])
  if (isExist.length > 0) {
    throw new Apierror(
      httpStatus.CONFLICT,
      'duplicate entry. please try to add new user'
    )
  }
  next()
})

const user = model<IUser, UserModel>('user', userSchema)
export default user
