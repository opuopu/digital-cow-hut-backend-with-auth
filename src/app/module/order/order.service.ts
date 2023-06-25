import mongoose from 'mongoose'
import cow from '../cow/cow.model'

import httpStatus from 'http-status'
import Apierror from '../../errors/handleapiError'
import { ICow } from '../cow/cow.interface'
import { IUser } from '../user/user.interface'
import User from '../user/user.model'
import { IOrder } from './order.interface'
import { order } from './order.model'

const createAorder = async (cowsid: string, buyerid: string) => {
  const cowsdata = await cow.findById(cowsid)
  const buyerdata = await User.findById(buyerid)
  // let errormessage=null
  let neworderdata = null
  if (buyerdata && cowsdata && cowsdata.label === 'for sale') {
    if (buyerdata.budget >= cowsdata.price) {
      const session = await mongoose.startSession()

      try {
        session.startTransaction()
        await cowsdata.populate('seller')
        const seller = cowsdata.seller as IUser
        const lasttotal = buyerdata.budget - cowsdata.price
        const sellerincome = seller.income + cowsdata.price

        await User.updateOne(
          { _id: buyerid },
          { $set: { budget: lasttotal } },
          { session }
        )
        await User.updateOne(
          { _id: seller._id },
          { $set: { income: sellerincome } },
          { session }
        )
        await cow.updateOne(
          { _id: cowsid },
          { $set: { label: 'sold out' } },
          { session }
        )
        neworderdata = await order.create([{ cow: cowsid, buyer: buyerid }], {
          session,
        })

        await session.commitTransaction()
        await session.endSession()
      } catch (error) {
        await session.abortTransaction()
        await session.endSession()
        throw error
      }
    } else {
      throw new Error(
        'sorry please increase your budget or the cwo might be sold out'
      )
    }
  } else {
    throw new Error('something went wrong. data not found')
  }

  return neworderdata
}

const getorders = async (user: any): Promise<IOrder[] | null> => {
  const { role, id } = user
  let result = null
  if (role === 'admin') {
    result = await order
      .find({})
      .populate({
        path: 'cow',
        populate: {
          path: 'seller',
        },
      })
      .populate('buyer')
  } else if (role === 'buyer') {
    result = await order
      .find({ buyer: id })
      .populate({
        path: 'cow',
        populate: {
          path: 'seller',
        },
      })
      .populate('buyer')
  } else if (role === 'seller') {
    const orders = await order
      .find()
      .populate({
        path: 'cow',
        populate: {
          path: 'seller',
        },
      })
      .populate('buyer')
    result = orders.filter(
      order => (order.cow as ICow).seller._id.toString() === id
    )
  } else {
    throw new Apierror(
      httpStatus.NOT_FOUND,
      'something went wrong. orders not found'
    )
  }

  return result
}
const getsingleorder = async (
  ids: string,
  user: any
): Promise<IOrder | null> => {
  const { role, id } = user
  let result: IOrder | null = null

  if (role === 'admin') {
    result = await order
      .findById(ids)
      .populate({
        path: 'cow',
        populate: {
          path: 'seller',
          model: 'user',
        },
      })
      .populate('buyer')
  } else if (role === 'buyer') {
    result = await order
      .findOne({ _id: ids, buyer: id })
      .populate({
        path: 'cow',
        populate: {
          path: 'seller',
          model: 'user',
        },
      })
      .populate('buyer')
  } else if (role === 'seller') {
    const orders = await order
      .findOne({ _id: ids })
      .populate('buyer')
      .populate({
        path: 'cow',
        populate: {
          path: 'seller',
          model: 'user',
        },
      })

    if (orders && (orders.cow as ICow).seller._id.toString() === id) {
      result = orders
    }
  } else {
    throw new Apierror(
      httpStatus.FORBIDDEN,
      'Access denied. Unauthorized role.'
    )
  }

  return result
}

const orderservices = {
  createAorder,
  getorders,
  getsingleorder,
}
export default orderservices
