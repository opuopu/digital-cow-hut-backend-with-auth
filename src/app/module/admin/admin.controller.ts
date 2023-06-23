import catchAsync from '../../../shared/catchasync'

import { Request, Response } from 'express'
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

export const adminController = {
  createAdmin,
}
