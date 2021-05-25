import User from '../models/user.js'
import { NotUnique, NotValid } from '../lib/errors.js'
import jwt from 'jsonwebtoken'
import { secret } from '../config/environment.js'

async function register(req, res, next) {
  try {
    console.log('req.body: ', req.body)

    const newUser = await User.create(req.body)
    res.status(200).json({ message: `Sign up successful, welcome ${newUser.username} !` })

  } catch (err) {

    const errorObj = {
      errName: 'NotValidRegistration',
      errMessage: {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
      },
    }

    const userMail = await User.findOne({ email: req.body.email })
    const userName = await User.findOne({ username: req.body.username })

    if (userMail || userName) {
      errorObj.errMessage.username = 'Invalid credentials, try something else.'
      errorObj.errMessage.email = 'Invalid credentials, try something else.'
    }

    if (req.body.password !== req.body.passwordConfirmation) {
      errorObj.errMessage.password = 'Passwords do not match.'
      errorObj.errMessage.passwordConfirmation = 'Passwords do not match.'
    }

    if (req.body.username === '') {
      errorObj.errMessage.username = 'Field is required.'
    }

    if (req.body.email === '') {
      errorObj.errMessage.email = 'Field is required.'
    }

    if (req.body.password === '') {
      errorObj.errMessage.password = 'Field is required.'
    }

    if (req.body.passwordConfirmation === '') {
      errorObj.errMessage.passwordConfirmation = 'Field is required.'
    }

    err.customError = errorObj
    
    next(err)
  }
}

// async function register(req, res, next) {
//   try {
//     console.log('req.body: ', req.body)
//     const userMail = await User.findOne({ email: req.body.email })
//     const userName = await User.findOne({ username: req.body.username })

//     if (userMail || userName) {
//       throw new NotUnique
//     } else if ((!userMail) && (!userName)) {
//       const newUser = await User.create(req.body)
//       res.status(200).json({ message: `Sign up successful, welcome ${newUser.username} !` })
//     }

//   } catch (err) {
//     next(err)
//   }
// }

async function login(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
      throw new NotValid
    }

    const isValidPw = user.validatePassword(req.body.password)

    if (!isValidPw) {
      throw new NotValid
    }

    const token = jwt.sign(
      { userId: user._id },
      secret,
      { expiresIn: '12h' }
    )

    console.log('Successful sign in')
    res.status(200).json({ message: `Login successful, welcome back ${user.username}!`, token })
    console.log(user)

  } catch (err) {
    next(err)
  }
}

async function checkUnique(req,res,next) {
  try {

    const user = await User.findOne({ username: req.body.username })
    const email = await User.findOne({ email: req.body.email })

    if (!user && !email) {
      res.sendStatus(200)
    } else {
      throw new NotUnique
    }

  } catch (err) {
    next(err)
  }
}


export default {
  register,
  login,
  checkUnique,
}