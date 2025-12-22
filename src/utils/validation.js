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

const validateEditFields = (req) => {
     const allowedEditFields = [
          "firstName",
          "lastName",
          "email",
          "age",
          "gender",
          "about",
          "photoURL",
          "skill",
     ];
     const isEditAllowed = Object.keys(req.body).every((field) =>
          allowedEditFields.includes(field)
     );
     return isEditAllowed;
}


module.exports = {
     validateEditFields,
     validateSign
}