import { NotFound } from '../lib/errors.js'
import Memory from '../models/memory.js'

// * Find all memeories in DB
async function index(req, res, next) {
  try {

    const memories = await Memory.find().populate('user')
    res.status(200).json(memories)

  } catch (err) {
    next(err)
  }
}

// * Find a single memory, by ID
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

// * Create a memory
async function create(req, res, next) {
  try {

    req.body.user = req.currentUser

    // * create memory
    const newMemory = await Memory.create(req.body)

    res.status(201).json(newMemory)

  } catch (err) {

    // * error message if memory already exists
    if (err.errors.title.properties.type === 'unique') {
      return res.status(400).json({ message: 'Memory already exists. Unable to create memory.' })
    }

    next(err)
  }
}

// * Edit a memory
async function edit(req, res, next) {
  try {

    const id = req.params.memoryId
    const memory = await Memory.findById(id)

    const currentUserId = req.currentUser._id
    const memoryUserId = memory.user

    if (!currentUserId.equals(memoryUserId)) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    if (!memory) {
      throw new NotFound()
    }

    await memory.updateOne(req.body)
    const updatedMemory = await Memory.findById(id)
    res.status(202).json(updatedMemory)
    
  } catch (err) {

    console.log('err: ', err)
    // * error message if memory already exists
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Memory already exists. Unable to create memory.' })
    }

    next(err)
  }
}

// * Remove a memory
async function remove(req, res, next) {
  try {

    const id = req.params.memoryId
    const memory = await Memory.findById(id)

    if (!memory) {
      throw new NotFound()
    }

    const memoryUserId = memory.user
    const currentUserId = req.currentUser._id

    if (!currentUserId.equals(memoryUserId)) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    await memory.deleteOne()

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
