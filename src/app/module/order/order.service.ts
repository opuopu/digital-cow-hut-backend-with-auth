import mongoose from 'mongoose'
import cow from '../cow/cow.model'

import { IUser } from '../user/user.interface'
import user from '../user/user.model'
import { IOrder } from './order.interface'
import { order } from './order.model'

const createAorder = async (cowsid: string, buyerid: string) => {
  const cowsdata = await cow.findById(cowsid)
  const buyerdata = await user.findById(buyerid)
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

        await user.updateOne(
          { _id: buyerid },
          { $set: { budget: lasttotal } },
          { session }
        )
        await user.updateOne(
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
const getorders = async (): Promise<IOrder[] | null> => {
  const result = await order.find({})
  return result
}
const orderservices = {
  createAorder,
  getorders,
}
export default orderservices
