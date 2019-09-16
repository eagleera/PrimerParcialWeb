import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  lastName: String,
  admin:Boolean
})

export default mongoose.model('User', userSchema)
