import { Document, Model } from 'mongoose'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface IUser extends Document {
  phoneNumber: number
  role: 'seller' | 'buyer'
  password: string
  name: {
    firstName: string
    lastName: string
  }

  address: string
  budget: number
  income: number
}
export type UserModel = Model<IUser, object>
