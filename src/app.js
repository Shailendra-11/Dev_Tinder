const express = require("express")


const app = express()



app.use("/test", (req, res , next) => {
  console.log("Hii")
  // res.send("This is first port ")
  next()
},)

app.use("/test", (req, res) => {
  res.send("this is second port")

})



app.listen(777, () => {
  console.log("hi this port number")
})