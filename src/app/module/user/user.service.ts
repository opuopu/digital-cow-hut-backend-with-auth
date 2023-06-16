import httpStatus from 'http-status'
import Apierror from '../../errors/handleapiError'
import { IUser } from './user.interface'
import user from './user.model'

const createAuser = async (users: IUser): Promise<IUser | null> => {
  const result = await user.create(users)
  if (!result) {
    throw new Apierror(httpStatus.BAD_REQUEST, 'something went wrong')
  }
  return result
}

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

const userService = {
  createAuser,
  getallUser,
  getSingleUser,
  deleteUser,
  updateUser,
}
export default userService
