import User from '../models/user.js'
import { NotUnique, NotValid } from '../lib/errors.js'
import jwt from 'jsonwebtoken'
import { secret } from '../config/environment.js'


async function register(req, res, next) {
  try {
    const userMail = User.findOne({ email: req.body.email })
    const userName = User.findOne({ username: req.body.username })
  

    if (userMail || userName) {
      throw new NotUnique
    } else if ((!userMail) && (!userName)) {
      const newUser = await User.create(req.body)
      res.status(200).json({ message: `Sign up successful, welcome ${newUser.username} !` })
    }
  } catch (e) {
    next(e)
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

    console.log('Successful sign in')
    res.status(200).json({ message: `Login successful, welcome back ${user.username} !`, token })

  } catch (e) {
    next(e)
  }
}


export default {
  register,
}