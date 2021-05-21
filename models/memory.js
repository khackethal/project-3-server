import mongoose from 'mongoose'
import commentSchema from './comment'

const memorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: String, required: true },
  picture: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: String, required: true },

  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },

  comments: [commentSchema],
})

export default mongoose.model('Memory', memorySchema)

