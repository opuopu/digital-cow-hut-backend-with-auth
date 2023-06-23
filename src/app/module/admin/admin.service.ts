import httpStatus from 'http-status'
import Apierror from '../../errors/handleapiError'
import { IAdmin, ILoginAdmin } from './admin.interface'
import admin from './admin.model'

const createadmin = async (payload: IAdmin): Promise<IAdmin | null> => {
  const result = await admin.create(payload)
  return result
}

// login admin
const loginadmin = async (payload: ILoginAdmin) => {
  const { phoneNumber, password } = payload
  const admins = new admin()
  const isUserExist = await admins.isUserExist(phoneNumber)
  if (!isUserExist) {
    throw new Apierror(httpStatus.NOT_FOUND, 'user not found')
  }
  const ispasswordMatched = admins.isPassWordMatched(
    password,
    isUserExist.password
  )
  if (!ispasswordMatched) {
    throw new Apierror(httpStatus.UNAUTHORIZED, 'password is incorrect')
  }
}

const adminServices = {
  createadmin,
  loginadmin,
}
export default adminServices
