// * package imports
import express from 'express'

// * req router import
import router from './views/router.js'

// * custom middleware imports
import logger from './middleware/logger.js'
// import errorHandler from './middleware/errorHandler.js'

const app = express()

app.use(express.json())

// * adding logging middleware
app.use(logger)

// * special piece of middleware
app.use('/api', router)

// * error handler last
// app.use(errorHandler)

export default app