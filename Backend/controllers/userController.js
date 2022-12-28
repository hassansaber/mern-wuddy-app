const User = require('../model/userModel');

// login user
const loginUser = async (req, res) => {
  res.json({
    message: 'login user'
  })
}

// signup user
const signupUser = async (req, res) => {

  // get email and password from req
  const { email, password } = req.body

  try {
    //sign up using static
    const user = await User.signup(email, password)

    // must use {} inside json
    res.status(201).json({ email, user }) // user => whole new document
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}


module.exports = {
  signupUser,
  loginUser
}