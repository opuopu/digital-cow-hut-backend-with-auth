import httpStatus from 'http-status'
import { SortOrder } from 'mongoose'
import { IPaginationOptions } from '../../../interfaces/Ipaginationoptions'
import calculatePagination from '../../../shared/paginationHelper'
import Apierror from '../../errors/handleapiError'
import { FilterableFields, ICow } from './cow.interface'
import cow from './cow.model'

const createAcow = async (cows: ICow): Promise<ICow | null> => {
  const result = await cow.create(cows)
  if (!result) {
    throw new Apierror(httpStatus.BAD_REQUEST, 'something went wrong')
  }
  return result
}

//   get all cows
type meta = {
  page: number
  limit: number
}
const getAllcows = async (
  filters: FilterableFields,
  paginationOptions: IPaginationOptions
): Promise<{ meta: meta; data: ICow[] | null }> => {
  const { page, limit, skip, sortOrder, sortBy } =
    calculatePagination(paginationOptions)
  const filter: any = {}
  console.log(filters)
  const { searchTerm, ...fields } = filters

  if (fields.minPrice) {
    filter.price = { $gte: Number(fields.minPrice) }
  }

  if (fields.maxPrice) {
    filter.price = {
      ...filter.price,
      $lte: Number(fields.maxPrice),
    }
  }
  if (fields.location) {
    filter.location = { $regex: fields.location, $options: 'i' }
  }

  // pagination
  const sort: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sort[sortBy] = sortOrder
  }
  const filterableFieldss = ['location', 'category', 'breed']

  if (searchTerm) {
    filterableFieldss.map(field => {
      filter.$or = filter.$or || []

      filter.$or.push({ [field]: { $regex: searchTerm, $options: 'i' } })
    })
  }

  const result = await cow
    .find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .populate('seller')
  return {
    meta: {
      page: page,
      limit: limit,
    },
    data: result,
  }
}

// cheek

//   get single cows
const getSinglCow = async (id: string): Promise<ICow | null> => {
  const result = await cow.findById({ _id: id }).populate('seller')
  return result
}

//   patch cow
const updateCow = async (
  id: string,
  payload: Partial<ICow>,
  user: any
): Promise<ICow | null> => {
  const cows = await cow.findOne({ _id: id, seller: user.id })

  if (!cows) {
    throw new Apierror(
      httpStatus.UNAUTHORIZED,
      'Cow not found or unauthorized access'
    )
  }
  const result = await cow
    .findOneAndUpdate({ _id: id }, payload, {
      new: true,
    })
    .populate('seller')
  return result
}

//   delete
const deleteCow = async (id: string, user: any): Promise<ICow | null> => {
  const cows = await cow.findOne({ _id: id, seller: user.id })

  if (!cows) {
    throw new Apierror(
      httpStatus.UNAUTHORIZED,
      'Cow not found or unauthorized access'
    )
  }
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
