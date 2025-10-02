const express = require("express")
const Database = require("./config/database")
const app = express()
const User = require("./model/user")
const { validateSignUpdate } = require("./utils/validation")
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');

app.use(express.json())
app.use(cookieParser())

app.post("/signup", async (req, res) => {
  // const UserObjec = new User(req.body)
  // created a user instance model
  try {
    validateSignUpdate(req)
    const { firstName, lastName, email, password, age } = req.body
    const hasPassword = await bcrypt.hash(password, 10)
    // console.log(hasPassword)
    const UserObjec = new User({
      firstName,
      lastName,
      email,
      age,
      password: hasPassword
    })
    await UserObjec.save()
    res.send("User succesfull")
  }
  catch (error) {
    res.status(400).send("Error sign:" + error.message)
  }
})


app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).send("Invalid caredentals");
    }

    const isPassword = await bcrypt.compare(password, user.password);

    if (isPassword) {
      const token = await jwt.sign({ _id: user._id }, 'devtoken');
      res.cookie("token", token)
      res.send("User login successful");
    } else {
      return res.status(400).send("Invalid caredentals");
    }
  } catch (error) {
    return res.status(500).send("Error: " + error.message);
  }
});


app.get("/profile", async (req, res) => {
  try {
    const cookies = req.cookies
    const { token } = cookies
    if (!token) {
      res.status(404).send("token is not availbale")
    }
    const decodedMessage = await jwt.verify(token, "devtoken")
    const { _id } = decodedMessage
    const users = await User.findById(_id)
    res.send(users)
  } catch (error) {
    return res.status(500).send("Error: " + error.message);
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


app.delete("/user", async (req, res) => {
  const id = req.body.userId
  try {
    const user = await User.findByIdAndDelete(id)
    if (!user) {
      res.status(404).send("User is not Found")
    } else {
      res.send("Delete success full")
    }
  } catch (error) {
    res.status(400).send("Something is wrong" + error.message)
  }
})


app.patch("/user", async (req, res) => {
  // console.log("User Update 65", req.body);   // ✅ log the payload correctly
  const id = req.body.userId;   // ✅ use consistent field name
  const data = req.body;
  try {
    const allowUpdate = [
      "photoUrl", "about", "gender", "age", "skill"
    ]
    const isUpdate = Object.keys(data).every((k) =>
      allowUpdate.includes(k)
    )
    if (!isUpdate) {
      res.status(400).send("Update is not allowed")
    }
    const user = await User.findByIdAndUpdate(
      id,
      data,
      { new: true, runValidation: true }
    );

    if (!user) {
      return res.status(404).send("User not found");
    }
    // console.log("Updated User:", user);
    res.send({ message: "User Update Successful", user });
  } catch (error) {
    res.status(400).send("Update failed: " + error.message);
  }
});






Database()
  .then(() => {
    app.listen(777, () => {
      console.log("hi this port number")
    })
  })
  .catch((error) => {
    console.log("No Server conntect")
  })
