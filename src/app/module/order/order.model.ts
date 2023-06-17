import mongoose, { Schema } from 'mongoose'
import { IOrder, orderModel } from './order.interface'

const orderSchema = new Schema<IOrder, orderModel>({
  cow: {
    type: Schema.Types.ObjectId,
    ref: 'cow',
    required: true,
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
})

export const order = mongoose.model<IOrder, orderModel>('order', orderSchema)
