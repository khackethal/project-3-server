import express from 'express'
import router from './views/router.js'
import logger from './middleware/logger.js'
import errorHandler from './middleware/errorHandler.js'

const app = express()

app.use(express.json())

// adding logging middleware
app.use(logger)

// special piece of middleware
app.use('/api', router)


// error handler last
app.use(errorHandler)


export default app