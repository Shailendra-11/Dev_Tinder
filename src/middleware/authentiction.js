const jwt = require("jsonwebtoken")
const UserModel = require("../model/user.js")

const userAuth = async (req, res, next) => {
     try {
          const { token } = req.cookies
          if (!token) {
               return res.status(401).send("Please Login or Signup");
          }
          const decodeObj = await jwt.verify(token, process.env.JWT_SECRET)
          const { _id } = decodeObj;
          const user = await UserModel.findById(_id).select("-password");
          if (!user) {
               throw new Error("User Not Found");
          }
          req.user = user;
          next();
     } catch (error) {
       
     }
}

module.exports = {
     userAuth
}