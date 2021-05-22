import mongoose from 'mongoose'
// import commentSchema from './comment.js'

const memorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String, required: true },
  tags: [{ type: String, required: true }],
  coordinates: {
    type: [Number],
    required: true,
    validate: [{
      validator: (coordinates) => coordinates.length === 2,
      message: (coordinates) => `Requirement array.length === 2. Current length is ${coordinates.length}`,
    }],
  },

  // user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },

  // comments: [commentSchema],
})

// function isLengthOfTwo(props) {
//   return props.length === 2
// }

export default mongoose.model('Memory', memorySchema)

