import httpStatus from 'http-status'
import { Secret } from 'jsonwebtoken'
import config from '../../../config'
import jwtHelper from '../../../shared/jwthelper'
import Apierror from '../../errors/handleapiError'
import { ILoginuser, IUser } from '../user/user.interface'
import user from '../user/user.model'

const createAuthUser = async (users: IUser): Promise<IUser | null> => {
  const result = await user.create(users)
  if (!result) {
    throw new Apierror(httpStatus.BAD_REQUEST, 'something went wrong')
  }
  return result
}
const loginuser = async (payload: ILoginuser) => {
  const { phoneNumber, password } = payload

  const users = new user()
  const isUserExist = await users.isUserExist(phoneNumber)
  if (!isUserExist) {
    throw new Apierror(httpStatus.NOT_FOUND, 'user not found')
  }
  const { role } = isUserExist

  if (
    isUserExist.password &&
    !(await users.isPassWordMatched(password, isUserExist.password))
  ) {
    throw new Apierror(httpStatus.UNAUTHORIZED, 'Password is incorrect')
  }
  const getuser = await user.findOne({ phoneNumber: phoneNumber }, { _id: 1 })
  if (!getuser) {
    throw new Apierror(httpStatus.NOT_FOUND, 'admin not found')
  }
  // accessToken
  const accessToken = jwtHelper.createToken(
    { id: getuser.id, role: role },
    config.jwt.secret as Secret,
    {
      expiresIn: config.jwt.jwt_expires_in,
    }
  )
  const refreshToken = jwtHelper.createToken(
    { id: getuser._id, role: role },
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

// refreshToken
const refreshToken = async (token: string) => {
  let verifyToken = null
  try {
    verifyToken = jwtHelper.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    )
  } catch (error) {
    throw new Apierror(404, 'invalid token')
  }
  // step 2 cheek if user exists or not
  const { id } = verifyToken
  const getuser = await user.findById(id)
  if (!getuser) {
    throw new Apierror(
      httpStatus.NOT_FOUND,
      'invalid user id,user not found on database'
    )
  }
  const { phoneNumber } = getuser
  const users = new user()
  const isUserExists = await users.isUserExist(phoneNumber)
  if (!isUserExists) {
    throw new Apierror(httpStatus.NOT_FOUND, 'user not found')
  }
  // step 3 generate new token
  const accessToken = jwtHelper.createToken(
    { id: getuser.id, role: isUserExists.role },
    config.jwt.secret as Secret,
    {
      expiresIn: config.jwt.jwt_expires_in,
    }
  )
  return {
    accessToken,
  }
}
const authservices = {
  createAuthUser,
  loginuser,
  refreshToken,
}
export default authservices
