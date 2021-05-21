import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
}, { timestamps: true })


export default mongoose.model(commentSchema)



