const jwt = require("jsonwebtoken");
const User = require("../model/user/user.model");

exports.verifyUser = async (req, res, next) => {
    try {
      let token = req.headers["authorization"].split(" ")[1];
      let { userId, role } = jwt.verify(token, process.env.SECRET_KEY);
      const user = await User.findById(userId);
  
      if (user && user.role === "user") {
        req.user = user;
        next();
      } else {
       return  res.status(403).json({ message: "not access by admin not your role" });
      }
    } catch (error) {
      res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
  };