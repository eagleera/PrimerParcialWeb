import mongoose from 'mongoose'
import payment_controller from '../controller/paymentController'

const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId;

const paymentSchema = new Schema({
  user: { type: ObjectId, required: true },
  amount: { type: Number, required: true },
  description: String,
  status: Boolean
})

paymentSchema.loadClass(payment_controller.payment_controller)
export default mongoose.model('Payment', paymentSchema)
