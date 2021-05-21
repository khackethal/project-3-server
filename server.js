import app from './app.js'
import connectToDb from './db/connectToDb.js'


async function startApp() {

  try {
    connectToDb()
    console.log('Connected to database')
    app.listen(4000, () => console.log('Express is now running'))
  } catch (e) {
    console.log('Something went wrong whilst starting app..')
    console.log(e)
  }

}

startApp()