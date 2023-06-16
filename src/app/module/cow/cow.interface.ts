import { Model, Types } from 'mongoose'
import { IUser } from '../user/user.interface'
import { Location, bread } from './cow.constant'

export type ICow = {
  name: string
  age: number
  price: number
  location: Location
  breed: bread
  weight: number
  label: 'for sale' | 'sold out'
  category: 'Dairy' | 'Beef' | 'DualPurpose '
  seller: Types.ObjectId | IUser // Assuming the reference ID is of type string
}

export type cowModel = Model<ICow, object>
