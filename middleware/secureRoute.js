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


    // if (err) {
    //   console.log('Im here')
    //   throw new NotAuthorized()
    //   // res.status(401).json( {
    //   //   errName: err.name,
    //   //   errMessage: 'Operation not authorised!',
    //   // })
    // }

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
      req.currentUser = user
  
      next()
    } catch (err) {
      next(err)
    }


  })


}
