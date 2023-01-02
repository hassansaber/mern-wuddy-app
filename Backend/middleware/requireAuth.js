const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

const requireAuth = async (req, res, next) => {

  // verify authentication 
  const { authorization } = req.headers

  // error handling
  if (!authorization) return res.status(401).json({ error: "Athorization token required" })

  // string = "bearer kdjfldgdljgldkcjvldjl"
  const token = authorization.split(' ')[1]

  //  token with jwt package
  try {
    // grab id
    const { _id } = jwt.verify(token, process.env.JWT_SECRET_KEY)

    //grab current id (as object) from db with given id (as string)
    //select returns only id  
    req.user = await User.findOne({ _id }).select('_id')
    // user = {_id: dshfbdnhjebafhew}

    next()

  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is no authorized" })

  }
}

module.exports = requireAuth