import mongoose from 'mongoose'

import uniqueValidator from 'mongoose-unique-validator'
import mongooseHidden from 'mongoose-hidden'

import bcrypt from 'bcrypt'

const schema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})
// ? password encryption
schema.pre('save', function encrypPassword(next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
  }
  next()
})

schema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password)
}

// ? password confirmation 
schema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfimation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
  })

schema
  .pre('validate', function checkPassword(next) {
    if (this.isModified('password') && (this.password !== this._passwordConfirmation)) {
      this.invalidate('passwordConfirmation', 'should match password')
    }
    next()
  })

schema.plugin(mongooseHidden({ defaultHidden: { password: true, email: true, _id: true } }))
schema.plugin(uniqueValidator)

export default mongoose.model('User', schema)