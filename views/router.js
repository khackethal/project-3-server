import { Router } from 'express'
import memoryController from '../controllers/memoryController.js'

Router.route('/memories')
  .get(memoryController.index)

Router.route('/memories/:memoryId')
  .get(memoryController.show)
