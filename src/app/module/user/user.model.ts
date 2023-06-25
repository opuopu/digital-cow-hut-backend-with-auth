import bcrypt from 'bcrypt'
import { Schema, model } from 'mongoose'
import config from '../../../config'
import { IUser, IUserMethods, UserModel } from './user.interface'
const userSchema = new Schema<IUser, UserModel, IUserMethods>({
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
    select: false,
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

userSchema.methods.isUserExist = async function (
  phoneNumber: string
): Promise<Pick<IUser, 'phoneNumber' | 'password' | 'role'> | null> {
  const isUserExist = await user.findOne(
    { phoneNumber },
    { password: 1, role: 1, phoneNumber: 1 }
  )

  return isUserExist
}

userSchema.methods.isPassWordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  const password = await bcrypt.compare(givenPassword, savedPassword)
  return password
}

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round)
  )

  next()
})

const user = model<IUser, UserModel>('user', userSchema)
export default user
