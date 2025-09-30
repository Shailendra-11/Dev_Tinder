const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
     firstName: {
          type: String,
          required: true
     },
     lastName: {
          type: String
     },
     email: {
          type: String,
          lowercase:true,
          required: true,
          unique: true

     },
     password: {
          type: String
     },
     age: {
          type: Number
     },
     gender: {
          type: String
     },
     photoUrl :{
        type :String,
        default:"https://www.vecteezy.com/png/35857753-people-face-avatar-icon-cartoon-character"
     },
     about :{
        type : String,
        default:"This is a default about n"
     },
     skill :{
      type : [String],
     }
     
})

const UserModel = mongoose.model("User", userSchema)
module.exports = UserModel;