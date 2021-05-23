import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import { secret } from '../config/environment.js'

export default function secureRoute( req, res, next) {


  //* 1) Check token
  const rawToken = req.headers.authorization


  // * check formatting
  if (!rawToken || !rawToken.startsWith('Bearer')) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  //* remove 'Bearer'
  const token = rawToken.replace('Bearer ', '')
  console.log(token)

  //* 2) Verify token
  jwt.verify(token, secret, async (err, payload) => {

    if (err) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const user = await User.findById(payload.userId)
    // ? In no user, unauthorized
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    // ? Add the user to our request
    req.currentUser = user

    next()
  })

}
