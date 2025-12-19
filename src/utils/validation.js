const validator = require("validator")

const validateSign = (req) => {
     const { firstName, lastName, email, password } = req.body
     if (!firstName || !lastName) {
          throw new Error("Enter a valid first or LastName")
     } else if (!validator.isEmail(email)) {
          throw new Error("Enter a valid email")
     } else if (!password) {
          throw new Error("Enter a strong password")
     }
}

const validateSignUpdate = (req) => {
     const { firstName, lastName, email, password, age } = req.body
     if (!firstName || !lastName) {
          throw new Error("Name is not valid")
     } else if (!validator.isEmail(email)) {
          throw new Error("Email is not valid")

     }
     // else if (!validator.isPassportNumber(password)) {
     //      throw new Error("Please enter a Strong Password")
     // }
     else if (age <= 15) {
          throw new Error("Please enter a age greter than 15")

     }
}


module.exports = {
     validateSignUpdate,
     validateSign
}