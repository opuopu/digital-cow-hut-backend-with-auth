import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchasync'
import createAuthUser from './auth.service'

const createauthUser = catchAsync(async (req: Request, res: Response) => {
  const result = await createAuthUser(req.body)
  res.send({
    success: true,
    statusCode: 200,
    message: 'Users created successfully',
    data: result,
  })
})
export default createauthUser
