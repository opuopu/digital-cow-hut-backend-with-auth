import { Request, Response } from 'express'
import config from '../../../config'
import catchAsync from '../../../shared/catchasync'
import authservices from './auth.service'

const createauthUser = catchAsync(async (req: Request, res: Response) => {
  const result = await authservices.createAuthUser(req.body)
  res.send({
    success: true,
    statusCode: 200,
    message: 'Users created successfully',
    data: result,
  })
})
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await authservices.loginuser(req.body)
  const { refreshToken, ...others } = result
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  }
  res.cookie('refreshToken', refreshToken, cookieOptions)

  res.send({
    success: true,
    statusCode: 200,
    message: 'Admin login successfully',
    data: others,
  })
})

// refresh Token
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies
  const result = await authservices.refreshToken(refreshToken)
  const cookieOptions = {
    secure: config.env === 'production' ? true : false,
    httpOnly: true,
  }
  res.cookie('refreshToken', refreshToken, cookieOptions)

  res.send({
    statusCode: 200,
    success: true,
    message: 'User login Successfully',
    data: result,
  })
})
const authcontroller = {
  createauthUser,
  loginUser,
  refreshToken,
}
export default authcontroller
