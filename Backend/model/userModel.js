const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

// schema
const Schema = mongoose.Schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,

  }
})

// static signup method
// must be regular func because of "this" keyword
userSchema.statics.signup = async function (email, password) {


  // validation
  if (!email || !password) throw Error('All fields must be filled')
  if (!validator.isEmail(email)) throw Error('Email is not valid')
  if (!validator.isStrongPassword(password)) throw Error('Password is not strong enough')


  // check email existence 
  // this is actually User model 
  const exists = await this.findOne({ email })
  if (exists) throw Error("Email already in use")

  // salt is sth will added to user password => dgnfdjghkcg ===> userpassworddgnfdjghkcg
  // salt prevent hackers to password matching

  // password hashing
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  // store email &  password in new document
  const user = await this.create({
    email,
    password: hash
  })

  return user
}

// static signup method
userSchema.statics.login = async function (email, password) {

  // validation
  if (!email || !password) throw Error('All fields must be filled')

  // get user from DB
  const user = await this.findOne({ email })

  // check user existence
  if (!user) throw Error("Incorrect email")

  //check password match
  const match = await bcrypt.compare(password, user.password)
  if (!match) throw Error("Incorrect password")

  return user;
}

// model
module.exports = mongoose.model('User', userSchema)