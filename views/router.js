import { Router } from 'express'

// * controller imports
import memoryController from '../controllers/memoryController.js'
import userController from '../controllers/userController.js'

//*secure route
// import secureRoute from '../middleware/secureRoute.js'

const router = Router()

// ! TO FILL IN - MEMORY ROUTES 

router.route('/memories')
  .get(memoryController.index)
  .post(memoryController.create)

router.route('/memories/:memoryId')
  .get(memoryController.show)
  .put(memoryController.edit)
  .delete(memoryController.remove)





// ! TO FILL IN - COMMENT ROUTES




//* USER ROUTES

router.route('/register')
  .post(userController.register)

router.route('/login')
  .post(userController.login)

export default router