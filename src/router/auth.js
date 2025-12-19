const express = require("express")
const router = express.Router()
const UserModel = require("../model/user.js")
const bcrypt = require('bcrypt');
const { validateSign } = require("../utils/validation.js")
const validator = require("validator")

router.post("/signup", async (req, res) => {
     try {
          validateSign(req)
          const { firstName, lastName, email, password, age, skill, about } = req.body
          const hasPassword = await bcrypt.hash(password, 10)
          const checkEmail = await UserModel.findOne(email)
          if (checkEmail) {
               throw new Error("Email Already Exist")
          }
          const UserObjec = new UserModel({
               firstName,
               lastName,
               email,
               age,
               skill,
               about,
               password: hasPassword
          })
          await UserObjec.save()
          res.status(200).send({
               "status": true,
               "message": "User Succesfull Sign"
          })
     }
     catch (error) {
          res.status(400).send("Error sign:" + error.message)
     }
})


router.post("/login", async (req, res) => {
     try {
          const { email, password } = req.body;
          if (!validator.isEmail(email)) {
               throw new Error("Invalid Email");
          }
          const user = await UserModel.findOne({ email: email });
          if (!user) {
               return res.status(400).send("Invalid caredentals");
          }
          const isValidPassword = await user.passwordCompare(password)
          if (isValidPassword) {
               const token = await user.getjwt()
               res.cookie("token", token, {
                    expires: new Date(Date.now() + 8 * 3600000),
               })
               res.status(200).send({
                    "status": true,
                    "message": "User Login Succesfull"
               })
          } else {
               throw new Error("Invalid Password");
          }
     } catch (error) {
          return res.status(500).send("Error: " + error.message);
     }
});


router.get("/logout", (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,     // false if not using HTTPS
      sameSite: "strict"
    });

    res.status(200).json({
      success: true,
      message: "User logged out successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});


module.exports = router;



