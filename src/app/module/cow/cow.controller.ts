import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchasync'
import pick from '../../../shared/pick'
import { filterableField, items } from './cow.constant'
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
// steps 1. create a pick function for query req.query
// step 2 calculatte sorting and paginations options using calculatepagination
// const getallcows = catchAsync(async (req: Request, res: Response) => {
//   const filters: FilterableFields = pick(req.query, filterableField)

//   const paginationOptions = pick(req.query, items)
//   const result = await cowsService.getAllcows(filters, paginationOptions)
//   res.send({
//     success: true,
//     statusCode: 200,
//     meta: result.meta,
//     message: 'cows retrieved  successfully',
//     data: result.data,
//   })
// })
const getallcows = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, filterableField)

  const paginationOptions = pick(req.query, items)
  const result = await cowsService.getAllcows(filters, paginationOptions)
  res.send({
    success: true,
    statusCode: 200,
    meta: result.meta,
    message: 'cows retrieved  successfully',
    data: result.data,
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
