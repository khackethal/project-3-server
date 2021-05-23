import { Router } from 'express'
import commentController from '../controllers/commentController.js'

// * controller imports
import memoryController from '../controllers/memoryController.js'
import userController from '../controllers/userController.js'

const router = Router()

router.route('/memories')
  .get(memoryController.index)



// ! TO FILL IN - MEMORY ROUTES 


// ! TO FILL IN - COMMENT ROUTES

router.route('/memory/:id/comment')
  .post(commentController.create)

router.route('/pokemon/pokemonId/comment/:commentId')
  .put(commentController.update)
  .delete(commentController.remove)

//* USER ROUTES

router.route('/register')
  .post(userController.register)

router.route('/login')
  .post(userController.login)

export default router