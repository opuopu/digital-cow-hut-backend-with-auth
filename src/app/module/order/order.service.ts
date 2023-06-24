import mongoose from 'mongoose'
import cow from '../cow/cow.model'

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

//
const getorders = async (user: any): Promise<IOrder[] | null> => {
  const { role, id } = user
  let result = null
  if (role === 'admin') {
    result = await order.find({}).populate('cow buyer')
  } else if (role === 'buyer') {
    result = await order.find({ buyer: id }).populate('cow buyer')
  } else if (role === 'seller') {
    const orders = await order.find().populate('cow buyer')
    result = orders.filter(
      order => (order.cow as ICow).seller.toString() === id
    )
  }

  return result
}
const orderservices = {
  createAorder,
  getorders,
}
export default orderservices
