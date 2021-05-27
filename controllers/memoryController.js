import { NotFound } from '../lib/errors.js'
import Memory from '../models/memory.js'
import axios from 'axios'

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

// * 1) Create a memory - PART 1 WITH USER INPUT
async function create(req, res, next) {
  try {

    req.body.user = req.currentUser

    // * create memory
    const newMemory = await Memory.create(req.body)
    newMemory.populate('user')
    newMemory.save()

    getData(newMemory.city, newMemory.country, newMemory)

    res.status(201).json(newMemory)

  } catch (err) {

    //* error message if memory already exists
    if (err.errors.title.properties.type === 'unique') {
      return res.status(400).json({ message: 'Memory already exists. Unable to create memory.' })
    }

    next(err)
  }
}


//* 2) Getting lat and lang based on city and country and saving the final memory to our data

const getData = async ( city, country, newMemory ) => {
  const finalCity = city.toLowerCase()
  const finalCountry = country.toLowerCase()

  try {
    const result = await axios.get(`http://open.mapquestapi.com/geocoding/v1/address?key=	kigSTGPns5XZHY23SQS8A2MRiDfG3FwM&location=${finalCity},${finalCountry}`)


    const latitude = ((result.data.results[0].locations[1].displayLatLng.lat))
    const longitude = ((result.data.results[0].locations[1].displayLatLng.lng))
    console.log(latitude)
    console.log(longitude)
    newMemory.populate('longitude')
    newMemory.populate('latitude')
    newMemory.longitude = longitude
    newMemory.latitude = latitude
    newMemory.save()
    console.log(newMemory)
    

  } catch (err) {
    console.log(err)
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
