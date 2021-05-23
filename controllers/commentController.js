import Memory from '../models/memory.js'
import { NotFound } from '../lib/errors.js'

async function create(req, res, next) {
  req.body.user = req.currentUser
  try {
    const memories = await Memory.findById(req.params.id)
      .populate('user')
      .populate('comments.user')
    if (!memories) {
      throw new NotFound('No memories found.')
    }
    memories.comments.push(req.body)
    const savedMemory = await memories.save()

    res.send(savedMemory)
  } catch (err) {
    next(err)
  }
}

async function update(req, res, next) {
  try {
    const { memoryId, commentId } = req.params
    const memories = await Memory.findById(memoryId)
    if (!memories) {
      throw new NotFound('No pokemon found.')
    }
    const comment = memories.comments.id(commentId)
    if (!req.currentUser._id.equals(comment.user)) {
      return res.status(401).send({ message: 'Unauthorized' })
    }
    comment.set(req.body)
    const savedMemory = await memories.save()

    res.send(savedMemory)
  } catch (e) {
    next(e)
  }
}

async function remove(req, res, next) {
  try {
    const { memoryId, commentId } = req.params
    const memories = await Memory.findById(memoryId)
    if (!memories) {
      throw new NotFound('No pokemon found.')
    }
    const comment = memories.comments.id(commentId)
    if (!req.currentUser._id.equals(comment.user)) {
      return res.status(401).send({ message: 'Unauthorized' })
    }
    comment.remove(req.body)
    const savedMemory = await memories.save()

    res.send(savedMemory)
  } catch (e) {
    next(e)
  }
}


export default {
  create,
  update,
  remove,
}