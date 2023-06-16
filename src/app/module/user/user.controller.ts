import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchasync'
import userService from './user.service'

const createuser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createAuser(req.body)
  res.send({
    success: true,
    statusCode: 200,
    message: 'Users created successfully',
    data: result,
  })
})

// get all
const getalluser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.getallUser()
  res.send({
    success: true,
    statusCode: 200,
    message: 'Users retrieved  successfully',
    data: result,
  })
})

// get single
const getsingleuser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.getSingleUser(req.params.id)
  res.send({
    success: true,
    statusCode: 200,
    message: 'User retrieved  successfully',
    data: result,
  })
})

// delete user
const deleteuser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.deleteUser(req.params.id)
  res.send({
    success: true,
    statusCode: 200,
    message: 'User deleted   successfully',
    data: result,
  })
})

// updateuser
const updateuser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.updateUser(req.params.id, req.body)
  res.send({
    success: true,
    statusCode: 200,
    message: 'User updated   successfully',
    data: result,
  })
})
const UserController = {
  createuser,
  getalluser,
  getsingleuser,
  deleteuser,
  updateuser,
}
export default UserController
