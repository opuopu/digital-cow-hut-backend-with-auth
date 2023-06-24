import { Document, Model } from 'mongoose'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface IUser extends Document {
  phoneNumber: string
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

export type IUserMethods = {
  isUserExist(
    phoneNumber: string
  ): Promise<Pick<IUser, 'phoneNumber' | 'password' | 'role'> | null>
  isPassWordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>
}

export type ILoginuser = {
  phoneNumber: string
  password: string
}
export type UserModel = Model<IUser, object, IUserMethods>
