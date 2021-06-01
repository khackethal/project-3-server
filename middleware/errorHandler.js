export default function errorHandler(err, req, res, next) {

  console.log('There was an error')
  console.log(err.name)
  console.log(err)

  // specific error handling 
  if (err.name === 'CastError') {
    return res.status(400).json( {
      errName: err.name,
      errMessage: 'Invalid parameter given.',
    })
  }

  if (err.name === 'NotAuthorized') {
    console.log('in NotAuthorized')
    return res.status(401).json( {
      errName: err.name,
      errMessage: 'Not authorized!',
    })
  }

  // * when a memory/id cannot be found in the DB
  if (err.name === 'NotFound') {
    return res.status(400).json({
      errName: err.name,
      errMessage: 'Element not found.',
    })
  }

  // * when credentials aren't unique at registration
  if (err.name === 'NotUnique') {
    console.log('in correct error')
    return res.status(400).json({
      errName: err.name,
      errMessage: {
        username: 'Invalid credentials, try something else.',
        // email: 'Invalid credentials, try something else.',
      },
    })
  }

  // * when missing required paramters post a new memory
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      errName: err.name,
      errMessage: 'Missing/Invalid paramaters, check your input.',
    })
  }

  // * when logging in
  if (err.name === 'NotValid') {
    return res.status(400).json({
      errName: err.name,
      errMessage: {
        email: 'Invalid credentials supplied.',
        password: 'Invalid credentials supplied.',
      },
    })
  }

  // * when editing someone else's memory
  if (err.name === 'NotYours') {
    return res.status(400).json({
      errName: err.name,
      errMessage: 'Unable to edit another user\'s memory.',
      
    })
  }

  // * when registration passwords don't match
  if (err.name === 'NoMatch') {
    return res.status(400).json({
      errName: err.name,
      errMessage: {
        password: 'Passwords do not match.',
        passwordConfirmation: 'Passwords do not match.',
      },
    })
  }

  // * when posting a memory/comment but not logged in
  if (err.name === 'NotLogged') {
    return res.status(400).json({
      errName: err.name,
      errMessage: 'Log in to proceed.',
    })
  }

  // Code 500 means internal server error
  res.sendStatus(500)

  // call next function
  next(err)
}