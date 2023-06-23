import httpStatus from 'http-status'
import { Secret } from 'jsonwebtoken'
import config from '../../../config'
import jwtHelper from '../../../shared/jwthelper'
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
    throw new Apierror(httpStatus.NOT_FOUND, 'admin not found')
  }
  const { role } = isUserExist
  const ispasswordMatched = admins.isPassWordMatched(
    password,
    isUserExist.password
  )
  if (!ispasswordMatched) {
    throw new Apierror(httpStatus.UNAUTHORIZED, 'password is incorrect')
  }
  const getadmin = await admin.findOne({ phoneNumber: phoneNumber }, { _id: 1 })
  if (!getadmin) {
    throw new Apierror(httpStatus.NOT_FOUND, 'admin not found')
  }
  // accessToken
  const accessToken = jwtHelper.createToken(
    { id: getadmin.id, role: role },
    config.jwt.secret as Secret,
    {
      expiresIn: config.jwt.jwt_expires_in,
    }
  )
  const refreshToken = jwtHelper.createToken(
    { id: getadmin.id, role: role },
    config.jwt.secret as Secret,
    {
      expiresIn: config.jwt.jwt_expires_in,
    }
  )

  return {
    accessToken,
    refreshToken,
  }
}
const adminServices = {
  createadmin,
  loginadmin,
}
export default adminServices
