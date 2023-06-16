import { Model } from 'mongoose'

export type IUser = {
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
