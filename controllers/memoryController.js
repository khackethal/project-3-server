import Memory from '../models/memory.js'

async function index(req, res, next) {
  try {

    const memories = Memory.find()
    res.sendStatus(200).json(memories)
  
  } catch (err) {
    next(err)
  }
}

export default [
  index
]