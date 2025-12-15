const validator = require("validator")

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
     validateSignUpdate
}