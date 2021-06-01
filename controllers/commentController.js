import Memory from '../models/memory.js'
import { NotAuthorized, NotFound } from '../lib/errors.js'


async function create(req, res, next) {
  
  try {
    
    req.body.user = req.currentUser

    const memory = await Memory.findById(req.params.memoryId)
      .populate('user')
      .populate('comments.user')

    // * given that comments are only available on memory pages,
    // * this shouldn't be needed, but keeping in case of unexpected errors/for testing
    if (!memory) {
      throw new NotFound()
    }

    memory.comments.push(req.body)
    memory.save()
    
    console.log('memory: ', memory)

    res.status(200).json(memory)

  } catch (err) {
    next(err)
  }
}

// ! Comment updates won't be implemented on front end
// async function update(req, res, next) {
//   const { memoryId, commentId } = req.params
//   try {

//     const memory = await Memory.findById(memoryId)

//     if (!memory) {
//       throw new NotFound
//     }

//     const comment = memory.comments.id(commentId)

//     if (!req.currentUser._id.equals(comment.user)) {
//       return res.status(401).send({ errMessage: 'Unauthorized! You cannot update other user\'s comments' })
//     }

//     comment.set(req.body)
//     const savedMemory = await memory.save()
//     res.status(200).json(savedMemory)

//   } catch (e) {
//     next(e)
//   }
// }
// ! ----------

async function remove(req, res, next) {
  const { memoryId, commentId } = req.params
  try {

    const memory = await Memory.findById(memoryId)

    if (!memory) {
      throw new NotFound
    }

    const comment = memory.comments.id(commentId)

    if (!req.currentUser._id.equals(comment.user)) {
      throw new NotAuthorized
    }

    comment.remove()
    await memory.save()
    
    res.sendStatus(200)

  } catch (e) {
    next(e)
  }
}


export default {
  create,
  remove,
  // update,
}