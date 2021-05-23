import Memory from '../models/memory.js'


async function index(req, res, next) {
  try {
    const memories = await Memory.find().populate('user')
    res.status(200).json(memories)
  
  } catch (err) {
    next(err)
  }
}


export default {
  index,
}
