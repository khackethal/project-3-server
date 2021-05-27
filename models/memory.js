import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

// * Embedded comment schema
const commentSchema = new mongoose.Schema( {
  text: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
} , { timestamp: true } 
)

const memorySchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  // location: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  date: { type: Date, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true, unique: true },
  tags: [{ type: String }],
  latitude: [{ type: Number }],
  longitude: [{ type: Number }],
  // coordinates: {
  //   type: [Number],
  //   required: true,
  //   validate: [{
  //     validator: (coordinates) => coordinates.length === 2,
  //     message: (coordinates) => `Requirement array.length === 2. Current length is ${coordinates.length}`,
  //   }],
  // },

  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },

  comments: [commentSchema],
})

memorySchema.plugin(uniqueValidator)

export default mongoose.model('Memory', memorySchema)