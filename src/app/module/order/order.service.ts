import mongoose from 'mongoose'
import cow from '../cow/cow.model'

import { IUser } from '../user/user.interface'
import user from '../user/user.model'

const createAorder = async (cowsid: string, buyerid: string) => {
  const cowsdata = await cow.findById(cowsid)
  const buyerdata = await user.findById(buyerid)
  // let errormessage=null
  if (buyerdata && cowsdata) {
    if (buyerdata.budget >= cowsdata.price) {
      const session = await mongoose.startSession()
      try {
        session.startTransaction()
        await cowsdata.populate('seller')
        const seller = cowsdata.seller as IUser
        cowsdata.label = 'sold out'
        const lasttotal = buyerdata.budget - cowsdata.price
        seller.income = lasttotal
        await seller.save({ session }) // Save changes to the seller object

        await cowsdata.save({ session }) // Save changes to the cowsdata object

        await session.commitTransaction()
        await session.endSession()
      } catch (error) {
        await session.abortTransaction()
        await session.endSession()
        throw error
      }
    }
  }
}

const orderservices = {
  createAorder,
}
export default orderservices
