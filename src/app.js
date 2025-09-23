const express = require("express")
const Database = require("./config/database")
const app = express()
const User = require("./model/user")
app.use(express.json())

app.post("/signup", async (req, res) => {
  const UserObjec = new User(req.body)
  // created a user instance model
  try {
    await UserObjec.save()
    res.send("User succesfull")
  }
  catch (error) {
    res.status(400).send("Error sign:" + error.message)
  }
})


app.get("/user", async (req, res) => {
  const userEmailId = req.body.email
  try {
    const user = await User.find({ email: userEmailId })
    if (!user.length) {
      res.status(404).send("User is not Found")
    } else {
      res.send(user)
    }
  } catch (error) {
    res.status(400).send("Something is wrong" + error.message)
  }
})


app.get("/feed", async (req, res) => {
  try {
    const user = await User.find({})
    // if (!user.length) {
    //   res.status(404).send("User is not Found")
    // } else {
      res.send(user)
    // }
  } catch (error) {
    res.status(400).send("Something is wrong" + error.message)
  }
})





Database()
  .then(() => {
    app.listen(777, () => {
      console.log("hi this port number")
    })
  })
  .catch((error) => {
    console.log("No Server conntect")
  })
