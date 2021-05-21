// ! package imports
import express from 'express'

// ! req router import
import router from './views/router.js'

// ! custom middleware imports
import logger from './middleware/logger.js'
// import errorHandler from './middleware/errorHandler.js'

const app = express()

app.use(express.json())
app.use(logger)
app.use('/api', router)
// app.use(errorHandler)

export default app