import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchasync'
import userService from './user.service'

// get all
const getalluser = catchAsync(async (req: Request, res: Response) => {
  console.log(req.headers.authorization)
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

// loginuser

// get profile
const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.getmyprofile(req.user)
  res.send({
    success: true,
    statusCode: 200,
    message: 'Users information retrieved successfully',
    data: result,
  })
})

// update profile
const updateMyProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.updateprofile(req.user, req.body)
  res.send({
    success: true,
    statusCode: 200,
    message: 'User information updated ',
    data: result,
  })
})

const UserController = {
  getalluser,
  getsingleuser,
  deleteuser,
  updateuser,
  getMyProfile,
  updateMyProfile,
}
export default UserController
