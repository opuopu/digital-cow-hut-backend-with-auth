import { Model } from 'mongoose'

export type IAdmin = {
  phoneNumber: string

  role: 'admin'
  password: string
  name: {
    firstName: string
    lastName: string
  }
  address: string
}

export type IAdminLogin = {
  phoneNumber: string
  password: string
}
export type IAdminMethods = {
  isUserExist(
    phoneNumber: string
  ): Promise<Pick<IAdmin, 'phoneNumber' | 'password' | 'role'> | null>
  isPassWordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>
}

export type ILoginAdmin = {
  phoneNumber: string
  password: string
}

export type AdminModel = Model<IAdmin, object, IAdminMethods>
