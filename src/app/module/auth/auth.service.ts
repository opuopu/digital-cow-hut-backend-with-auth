import httpStatus from 'http-status'
import Apierror from '../../errors/handleapiError'
import { IUser } from '../user/user.interface'
import user from '../user/user.model'

const createAuthUser = async (users: IUser): Promise<IUser | null> => {
  const result = await user.create(users)
  if (!result) {
    throw new Apierror(httpStatus.BAD_REQUEST, 'something went wrong')
  }
  return result
}
export default createAuthUser
