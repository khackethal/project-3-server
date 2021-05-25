export default function errorHandler(err, req, res, next) {

  console.log('There was an error')
  console.log(err.name)
  console.log(err)


  // specific error handling 
  if (err.name === 'CastError') {
    return res.status(400).json( {
      message: 'Invalid parameter given.',
      name: err.name,
    })
  }

  // * when a memory/id cannot be found in the DB
  if (err.name === 'NotFound') {
    return res.status(400).json({
      message: 'Not found.',
      name: err.name,
    })
  }

  // * when credentials aren't unique at registration
  if (err.name === 'NotUnique') {
    return res.status(400).json({
      message: 'Invalid credentials, try something else.',
      name: err.name,
    })
  }

  // * when missing required paramters post a new memory
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Missing/Invalid paramaters, check your input.',
      name: err.name,
    })
  }

  // * when logging in
  if (err.name === 'NotValid') {
    return res.status(400).json({
      message: 'Invalid credentials supplied.',
      name: err.name,
    })
  }

  // * when editing someone else's memory
  if (err.name === 'NotYours') {
    return res.status(400).json({
      message: 'Unable to edit another user\'s memory.',
      name: err.name,
    })
  }

  // * when registration passwords don't match
  if (err.name === 'NoMatch') {
    return res.status(400).json({
      message: 'Passwords do not match.',
      name: err.name,
    })
  }

  // if (err.name === 'NoEmailMatch') {
  //   return res.status(400).json({
  //     message: 'Email and email confirmation do not match, please double check your input.',
  //     name: err.name,
  //   })
  // }

  // * when posting a memory but not logged in
  if (err.name === 'NotLogged') {
    return res.status(400).json({
      message: 'Log in to create a memory.',
      name: err.name,
    })
  }

  // Code 500 means internal server error
  res.sendStatus(500)

  // call next function
  next(err)
}