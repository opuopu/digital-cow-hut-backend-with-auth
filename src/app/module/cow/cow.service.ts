import httpStatus from 'http-status'
import Apierror from '../../errors/handleapiError'
import { ICow } from './cow.interface'
import cow from './cow.model'

const createAcow = async (cows: ICow): Promise<ICow | null> => {
  const result = await cow.create(cows)
  if (!result) {
    throw new Apierror(httpStatus.BAD_REQUEST, 'something went wrong')
  }
  return result
}

//   get all cows
const getAllcows = async (): Promise<ICow[] | null> => {
  const result = await cow.find({}).populate('seller')
  return result
}

//   get single cows
const getSinglCow = async (id: string): Promise<ICow | null> => {
  const result = await cow.findById({ _id: id }).populate('seller')
  return result
}

//   patch cow
const updateCow = async (
  id: string,
  payload: Partial<ICow>
): Promise<ICow | null> => {
  const result = await cow
    .findOneAndUpdate({ _id: id }, payload, {
      new: true,
    })
    .populate('seller')
  return result
}

//   delete
const deleteCow = async (id: string): Promise<ICow | null> => {
  const result = await cow.findOneAndDelete({ _id: id })
  return result
}

const cowsService = {
  createAcow,
  getAllcows,
  getSinglCow,
  updateCow,
  deleteCow,
}
export default cowsService
