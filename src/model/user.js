const mongoose = require('mongoose')
const validator = require("validator")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
     firstName: {
          type: String,
          required: true,
     },
     lastName: {
          type: String,
          required: true,
     },
     email: {
          type: String,
          lowercase: true,
          required: true,
          unique: true,
     },
     password: {
          type: String,
          required: true,
     },
     age: {
          type: Number,
          required: false,
          min: 18,
     },
     gender: {
          type: String,
          required: false,
          trim: true,
          validate(value) {
               if (!["male", "female", "others", "Male", "Female", "Others"].includes(value)) {
                    throw new Error("Not a valid gender (Male , Female and other)");
               }
          },
     },
     photoUrl: {
          type: String,
          default: "https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg?t=st=1740779693~exp=1740783293~hmac=3ffc11733917c931bddeec957e8fa649e6a1590282b3210d816ccbf54dab2e94&w=900",
          validate(value) {
               if (!validator.isURL(value)) {
                    throw new Error("Invalid URL :" + value);
               }
          },
     },
     about: {
          type: String,
          default: "Dev is in search for someone here",
     },
     skill: {
          type: [String],
     },

}, {
     timestamps: true,
}
)


userSchema.method.getjwt = async function () {

}

userSchema.method.passwordCompare = async function () {

}

const UserModel = mongoose.model("User", userSchema)
module.exports = UserModel;