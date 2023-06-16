import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchasync'
import cowsService from './cow.service'

const createcow = catchAsync(async (req: Request, res: Response) => {
  const result = await cowsService.createAcow(req.body)
  res.send({
    success: true,
    statusCode: 200,
    message: 'cow created  successfully',
    data: result,
  })
})

const getsinglecow = catchAsync(async (req: Request, res: Response) => {
  const result = await cowsService.getSinglCow(req.params.id)
  res.send({
    success: true,
    statusCode: 200,
    message: 'cow retrieved  successfully',
    data: result,
  })
})

//   get all
const getallcows = catchAsync(async (req: Request, res: Response) => {
  const result = await cowsService.getAllcows()
  res.send({
    success: true,
    statusCode: 200,
    message: 'cows retrieved  successfully',
    data: result,
  })
})

// delete user
const deletecow = catchAsync(async (req: Request, res: Response) => {
  const result = await cowsService.deleteCow(req.params.id)
  res.send({
    success: true,
    statusCode: 200,
    message: 'cows deleted   successfully',
    data: result,
  })
})

// update
const updatecow = catchAsync(async (req: Request, res: Response) => {
  const result = await cowsService.updateCow(req.params.id, req.body)
  res.send({
    success: true,
    statusCode: 200,
    message: 'cow updated   successfully',
    data: result,
  })
})

const cowsController = {
  createcow,
  getsinglecow,
  getallcows,
  deletecow,
  updatecow,
}
export default cowsController
