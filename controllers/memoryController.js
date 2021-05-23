import { NotFound } from '../lib/errors.js'
import Memory from '../models/memory.js'
import mongoose from 'mongoose'

// * Find all memeories in DB
async function index(req, res, next) {
  try {

    const memories = await Memory.find().populate('user')
    res.status(200).json(memories)

  } catch (err) {
    next(err)
  }
}

// * Find one memory in DB
async function show(req, res, next) {
  try {

    const id = req.params.memoryId
    const memory = await Memory.findById(id)

    if (!memory) {
      throw new NotFound()
    }

    res.status(200).json(memory)

  } catch (err) {
    next(err)
  }
}

async function create(req, res, next) {
  try {
    const newMemory = await Memory.create(req.body)
    console.log('newMemory: ', newMemory)

    res.status(201).json('New memory created')

  } catch (err) {
    next(err)
  }
}

async function edit(req, res, next) {
  try {

    // * to get mongoose to use the global option 'useFindAndModify' instead of 'findAndModify' function (which seems to be deprecated)
    mongoose.set('useFindAndModify', false)

    const id = mongoose.Types.ObjectId(req.params.memoryId)
    const editedMemory = await Memory.findOneAndUpdate( { _id: id } , req.body)

    if (!editedMemory) {
      throw new NotFound()
    }

    res.status(202).json(editedMemory)
    
  } catch (err) {
    next(err)
  }
}

async function remove(req, res, next) {
  try {

    const id = req.params.memoryId
    const memoryToDelete = await Memory.findById(id)
    console.log('memoryToDelete: ', memoryToDelete)

    if (!memoryToDelete) {
      throw new NotFound()
    }

    await memoryToDelete.deleteOne()

    res.sendStatus(204)
    
  } catch (err) {
    next(err)
  }
}

export default {
  index,
  show,
  create,
  edit,
  remove,
}
