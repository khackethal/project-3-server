import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import { secret } from '../config/environment.js'
import { NotAuthorized } from '../lib/errors.js'

export default function secureRoute( req, res, next) {

  //* 1) Check token
  const rawToken = req.headers.authorization

  // * check formatting
  if (!rawToken || !rawToken.startsWith('Bearer')) {
    throw new NotAuthorized()
  }

  //* remove 'Bearer'
  const token = rawToken.replace('Bearer ', '')

  //* 2) Verify token
  jwt.verify(token, secret, async (err, payload) => {

    try {

      if (err) {
        throw new NotAuthorized()
      }
      const user = await User.findById(payload.userId)

      // ? In no user, unauthorized
      if (!user) {
        throw new NotAuthorized()
      }

      // ? Add the user to our request
      req.currentUser = {
        userId: payload.userId,
        username: user.username,
      }
  
      next()
    } catch (err) {
      next(err)
    }

  })


}
