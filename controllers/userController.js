import User from '../models/user.js'
import { NotUnique, NotValid } from '../lib/errors.js'
import jwt from 'jsonwebtoken'
import { secret } from '../config/environment.js'

async function register(req, res, next) {
  try {

    const userFound = await User.findOne(
      { $or: [
        { username: req.body.username },
        { email: req.body.email }
      ] } )

    if (userFound) {
      throw new NotUnique
    }
    
    const newUser = await User.create(req.body)

    const token = jwt.sign(
      { userId: newUser._id },
      secret,
      { expiresIn: '12h' }
    )

    res.status(200).json({ message: `Sign up successful, welcome ${newUser.username} !`, token })

  } catch (err) {
    next(err)
  }
}

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
    console.log('err.name: ', err.name)
    next(err)
  }
}

export default {
  register,
  login,
  checkUnique,
}