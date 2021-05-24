export default function errorHandler(err, req, res, next) {

  console.log('There was an error')
  console.log(err.name)
  console.log(err)


  // specific error handling 
  if (err.name === 'CastError') {
    return res.status(400).json( { message: 'Invalid parameter given' })
  }

  if (err.name === 'NotFound') {
    return res.status(400).json({ message: 'Not found' })
  }

  if (err.name === 'NotUnique') {
    return res.status(400).json({ message: 'Cannot create user with these credentials, please double check your input' })
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: 'Missing paramaters to create your memory, please double check your input' })
  }

  if (err.name === 'NotValid') {
    return res.status(400).json({ message: 'Wrong log in details supplied' })
  }

  if (err.name === 'NotYours') {
    return res.status(400).json({ message: 'Unable to edit another users memory' })
  }

  if (err.name === 'NoMatch') {
    return res.status(400).json({ message: 'Password and password confirmation do not match, please double check your input.' })
  }

  if (err.name === 'NoEmailMatch') {
    return res.status(400).json({ message: 'Email and email confirmation do not match, please double check your input.' })
  }

  if (err.name === 'NotLogged') {
    return res.status(400).json({ message: 'Unable to create memory, you need to be logged in.' })
  }

  // Code 500 means internal server error
  res.sendStatus(500)

  // call next function
  next(err)
}