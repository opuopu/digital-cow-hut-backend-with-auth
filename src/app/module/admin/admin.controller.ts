import catchAsync from '../../../shared/catchasync'

import { Request, Response } from 'express'
import config from '../../../config'
import adminServices from './admin.service'

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await adminServices.createadmin(req.body)

  res.send({
    success: true,
    statusCode: 200,
    message: 'Admin created successfully',
    data: result,
  })
})

const loginAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await adminServices.loginadmin(req.body)
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

export const adminController = {
  createAdmin,
  loginAdmin,
}
