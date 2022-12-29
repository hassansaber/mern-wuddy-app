const User = require('../model/userModel');
const jwt = require('jsonwebtoken');

// token generator
const createToken = (_id) => {
  //sign =>>({payload},key for signature, option { xp: date of expire})
  return jwt.sign({ _id }, process.env.JWT_SECRET_KEY, { expiresIn: '3d' })
}


// signup user
const signupUser = async (req, res) => {

  // get email and password from req
  const { email, password } = req.body


  try {
    //sign up using static
    const user = await User.signup(email, password) // user => whole new document

    // create jwt token
    const token = createToken(user._id)

    // must use {} inside json
    res.status(201).json({ email, token })
  } catch (error) {
    res.status(400).json({ error: error.message }) // message is what we throw 
  }
}


// login user
const loginUser = async (req, res) => {

  // get email and password from req
  const { email, password } = req.body


  try {
    //sign up using static
    const user = await User.login(email, password) // user => whole new document

    // create jwt token
    const token = createToken(user._id)

    // must use {} inside json
    res.status(200).json({ email, token })
  } catch (error) {
    res.status(400).json({ error: error.message }) // message is what we throw 
  }
}


module.exports = {
  signupUser,
  loginUser
}