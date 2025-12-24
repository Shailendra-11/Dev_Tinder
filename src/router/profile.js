const express = require("express")
const routerProfile = express.Router()
const UserModel = require("../model/user.js");
const { userAuth } = require("../middleware/authentiction.js");
const { validateEditFields } = require("../utils/validation.js")

routerProfile.get("/profile", userAuth, (req, res) => {
     try {
          const user = req.user;
          res.status(200).send({
               "status": true,
               "user": user
          })
     } catch (error) {
          return res.status(500).send("Error: " + error.message);
     }
})


routerProfile.patch("/profile/edit", userAuth, async (req, res) => {
     try {
          if (!validateEditFields) {
               throw new Error("Invalid Edit request");
          }
          const loggedInUser = req.user;
          Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
          await loggedInUser.save();
          res.json({
               message: ` ${loggedInUser.firstName}, your profile updated successfully`,
               data: loggedInUser,
          });
     } catch (err) {
          res.status(400).send("ERROR : " + err.message);
     }
})



module.exports = routerProfile;