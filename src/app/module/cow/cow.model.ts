import mongoose, { Schema } from 'mongoose'
import { locations } from './cow.constant'
import { ICow, cowModel } from './cow.interface'

const cowSchema = new Schema<ICow, cowModel>(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    price: { type: Number, required: true },
    location: { type: String, enum: locations, required: true },
    breed: { type: String, required: true },
    weight: { type: Number, required: true },
    label: {
      type: String,
      enum: ['for sale', 'sold out'],
      default: 'for sale',
    },
    category: { type: String, required: true },
    seller: { type: Schema.Types.ObjectId, ref: 'seller', required: true },
  },
  {
    timestamps: true,
  }
)

const cowmodel = mongoose.model<ICow, cowModel>('cow', cowSchema)

export default cowmodel
