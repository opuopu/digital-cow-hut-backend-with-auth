import { Schema, model } from 'mongoose'
import { AdminModel, IAdmin, IAdminMethods } from './admin.interface'

import bcrypt from 'bcrypt'
import config from '../../../config'
const adminSchema = new Schema<IAdmin, IAdminMethods, AdminModel>(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ['admin'],
      default: 'admin',
    },

    password: {
      type: String,
      required: true,
      select: 0,
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
    address: {
      type: String,
      required: true,
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

adminSchema.methods.isUserExist = async function (
  phoneNumber: string
): Promise<Pick<IAdmin, 'phoneNumber' | 'password' | 'role'> | null> {
  const isUserExist = await admin.findOne(
    { phoneNumber },
    { password: 1, role: 1, phoneNumber: 1 }
  )

  return isUserExist
}

adminSchema.methods.isPassWordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  const password = await bcrypt.compare(givenPassword, savedPassword)
  return password
}

adminSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round)
  )

  next()
})

const admin = model<IAdmin, AdminModel>('admin', adminSchema)
export default admin
