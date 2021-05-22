import { Router } from 'express'

// * controller imports
import memoryController from '../controllers/memoryController.js'
// import userController from '../controllers/userController.js'

const router = Router()

router.route('/memories')
  .get(memoryController.index)

// router.route('/memories/:memoryId')
//   .get(memoryController.show)


// ! TO FILL IN - MEMORY ROUTES 


// ! TO FILL IN - COMMENT ROUTES




// * USER ROUTES

// router.route('/register')
//   .post(userController.register)

// router.route('/login')
//   .post(userController.login)

export default router