import { Router } from 'express'
import commentController from '../controllers/commentController.js'

// * controller imports
import memoryController from '../controllers/memoryController.js'
import userController from '../controllers/userController.js'

//*secure route
import secureRoute from '../middleware/secureRoute.js'

const router = Router()

// ! TO FILL IN - MEMORY ROUTES 

router.route('/memories')
  .get(memoryController.index)
  .post(secureRoute, memoryController.create)

router.route('/memories/:memoryId')
  .get(memoryController.show)
  .put(secureRoute, memoryController.edit)
  .delete(secureRoute, memoryController.remove)





// ! TO FILL IN - COMMENT ROUTES

router.route('/memory/:id/comment')
  .post(secureRoute, commentController.create)

router.route('/pokemon/pokemonId/comment/:commentId')
  .put(secureRoute, commentController.update)
  .delete(secureRoute, commentController.remove)

//* USER ROUTES

router.route('/register')
  .post(userController.register)

router.route('/login')
  .post(userController.login)

export default router