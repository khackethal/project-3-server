import { Router } from 'express'
import commentController from '../controllers/commentController.js'

// * controller imports
import memoryController from '../controllers/memoryController.js'
import userController from '../controllers/userController.js'

//*secure route
import secureRoute from '../middleware/secureRoute.js'

const router = Router()

// * MEMORY ROUTES

router.route('/memories')
  .get(memoryController.index)
  .post(secureRoute, memoryController.create)

router.route('/memories/:memoryId')
  .get(memoryController.show)
  .put(secureRoute, memoryController.edit)


router.route('/memories/:memoryId/comment')
  .post(secureRoute, commentController.create)

router.route('/memories/:memoryId/comment/:commentId')
  .delete(secureRoute, commentController.remove)
  // ! Comment updates won't be implemented on front end
  // .put(secureRoute, commentController.update)


//* USER ROUTES

router.route('/register')
  .post(userController.register)

router.route('/register/checkuser')
  .post(userController.checkUnique)

router.route('/login')
  .post(userController.login)

export default router