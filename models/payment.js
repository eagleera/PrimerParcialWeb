import mongoose from 'mongoose'

const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId;

const paymentSchema = new Schema({
  user: { type: ObjectId, required: true },
  amount: { type: Number, required: true },
  description: String,
  status: Boolean
})

export default mongoose.model('Payment', paymentSchema)
