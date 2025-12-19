const express = require("express")
const routerProfile = express.Router()
const UserModel = require("../model/user.js");
const { userAuth } = require("../middleware/authentiction.js");



routerProfile.get("/profile", userAuth, (req, res) => {
     try {
          const user = req.user;
          res.status(200).send({
               "status": true,
               "user" : user
          })
     } catch (error) {
          return res.status(500).send("Error: " + error.message);
     }
})



module.exports = routerProfile;