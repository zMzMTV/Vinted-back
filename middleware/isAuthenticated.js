const User = require("../models/User");

const isAuthenticated = async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.replace("Bearer ", "");
    // Look in Db if a user has this token
    const user = await User.findOne({ token: token }).select("account _id");
    if (user) {
      req.user = user;
      next();
    } else {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
  } else {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};

module.exports = isAuthenticated;
