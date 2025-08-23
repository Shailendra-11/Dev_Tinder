const express = require ("express")


const app  = express()

app.use("/" ,(req ,res)=>{
   res.send("hi this first server")
   
})

app.use("/test", (req ,res)=>{
     res.send("hi this / code")
})


app.listen(3000,()=>{
  console.log("hi this port number")
})