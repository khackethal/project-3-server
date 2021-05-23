import mongoose from 'mongoose'

import uniqueValidator from 'mongoose-unique-validator'
import mongooseHidden from 'mongoose-hidden'

import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})
<<<<<<< HEAD
// ? password encryption
schema.pre('save', function encryptPassword(next) {
=======
// * password encryption
userSchema.pre('save', function encrypPassword(next) {
>>>>>>> development
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
  }
  next()
})

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password)
}

// * password confirmation 
<<<<<<< HEAD
schema
=======
userSchema
>>>>>>> development
  .virtual('passwordConfirmation')
  .set(function setPasswordConfimation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
  })

userSchema
  .pre('validate', function checkPassword(next) {
    if (this.isModified('password') && (this.password !== this._passwordConfirmation)) {
      this.invalidate('passwordConfirmation', 'should match password')
    }
    next()
  })

<<<<<<< HEAD

schema.pre('save', function encryptEmail(next) {
  if (this.isModified('email')) {
    this.email = bcrypt.hashSync(this.email, bcrypt.genSaltSync())
  }
  next()
})

schema.methods.validateEmail = function validateEmail(email) {
  return bcrypt.compareSync(email, this.email)
}

// * email confirmation 
schema
  .virtual('emailConfirmation')
  .set(function setEmailConfimation(emailConfirmation) {
    this._emailConfirmation = emailConfirmation
  })

schema
  .pre('validate', function checkEmail(next) {
    if (this.isModified('email') && (this.email !== this._emailConfirmation)) {
      this.invalidate('emailConfirmation', 'should match email')
    }
    next()
  })

schema.plugin(mongooseHidden({ defaultHidden: { password: true, email: true, _id: true } }))
schema.plugin(uniqueValidator)
=======
userSchema.plugin(mongooseHidden({ defaultHidden: { password: true, email: true, _id: true } }))
userSchema.plugin(uniqueValidator)
>>>>>>> development

export default mongoose.model('User', userSchema)