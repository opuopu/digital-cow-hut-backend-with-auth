import bcrypt from 'bcrypt'
import httpStatus from 'http-status'
import { JwtPayload } from 'jsonwebtoken'
import config from '../../../config'
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

  const result = await user.findOne({ _id: id })
  if (!result) {
    throw new Apierror(httpStatus.NOT_FOUND, 'user not found')
  }
  return result
}
// updateProfile
const updateprofile = async (
  users: JwtPayload,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const { id } = users
  const { name, ...others } = payload
  const updatedUserData: Partial<IUser> = { ...others }
  if (payload.password) {
    const hasspassword = await bcrypt.hash(
      payload.password,
      Number(config.bcrypt_salt_round)
    )
    updatedUserData.password = hasspassword
  }
  // dynamic update
  if (name && Object.keys(name).length) {
    Object.entries(name).forEach(([key, value]) => {
      const newNameKey = `name.${key}`
      ;(updatedUserData as any)[newNameKey] = value
    })
  }

  const result = await user.findOneAndUpdate({ _id: id }, updatedUserData, {
    new: true,
  })
  if (!result) {
    throw new Apierror(404, 'something went wrong')
  }
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
