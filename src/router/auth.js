const express = require("express")
const router = express.Router()
const  UserModel = require("../model/user.js")
const { validateSign } = require("../utils/validation.js")

router.post("/signup", async (req, res) => {
     try {
          validateSign(req)
          const { firstName, lastName, email, password, age, skill , about } = req.body
          const hasPassword = await bcrypt.hash(password, 10)
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
          res.send("User succesfull")
     }
     catch (error) {
          res.status(400).send("Error sign:" + error.message)
     }
})


// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email: email });
//     if (!user) {
//       return res.status(400).send("Invalid caredentals");
//     }

//     const isPassword = await bcrypt.compare(password, user.password);

//     if (isPassword) {
//       const token = await jwt.sign({ _id: user._id }, 'devtoken');
//       res.cookie("token", token)
//       res.send("User login successful");
//     } else {
//       return res.status(400).send("Invalid caredentals");
//     }
//   } catch (error) {
//     return res.status(500).send("Error: " + error.message);
//   }
// });

module.exports = router;



