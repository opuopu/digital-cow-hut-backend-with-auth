import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchasync'
import orderservices from './order.service'

const createorder = catchAsync(async (req: Request, res: Response) => {
  const { cow, buyer } = req.body
  const result = await orderservices.createAorder(cow, buyer)

  res.send({
    success: true,
    data: result,
  })
})

const orderController = {
  createorder,
}
export default orderController
