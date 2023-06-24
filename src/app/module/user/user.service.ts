import httpStatus from 'http-status'
import { JwtPayload } from 'jsonwebtoken'
import Apierror from '../../errors/handleapiError'
import { IUser } from './user.interface'
import user from './user.model'

// get all user
const getallUser = async (): Promise<IUser[] | null> => {
  const result = await user.find({})
  if (!result) {
    throw new Apierror(httpStatus.BAD_REQUEST, 'something went wrong')
  }
  return result
}

// get single user
const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await user.findById({ _id: id })
  return result
}

// delete a user

const deleteUser = async (id: string): Promise<IUser | null> => {
  const result = await user.findOneAndDelete({ _id: id })
  return result
}

// updateAuser
const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const result = await user.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

// login a user

// get profile
const getmyprofile = async (users: any): Promise<IUser | null> => {
  const { id } = users
  console.log(id)
  const result = await user.findOne({ _id: id })
  return result
}
// updateProfile
const updateprofile = async (
  users: JwtPayload,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const { id } = users
  const result = await user.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

const userService = {
  getallUser,
  getSingleUser,
  deleteUser,
  updateUser,
  getmyprofile,
  updateprofile,
}
export default userService
