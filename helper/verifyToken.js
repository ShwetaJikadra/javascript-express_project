const jwt = require("jsonwebtoken");
const User = require("../model/user/user.model");
exports.verifyToken = async (req, res, next) => {

  const authorizationHeader = req.headers['authorization'];

  if (!authorizationHeader) {
    return res.status(401).json({ error: 'Authorization header is missing' });
  }

  let token = req.headers["authorization"].split(" ")[1];

  let { userId } = jwt.verify(token, process.env.SECRET_KEY);
  console.log(userId);
 
  req.user = await User.findById(userId);

  if (req.user) {
    next();
  } else {
    res.json({ message: "User Invalid" });
  }
};
