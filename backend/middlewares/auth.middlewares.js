// const express = require("express");
// const { body, validationResult } = require("express-validator");
// const passwordValidator = require("password-validator");



// const passValidator = function (req, res, next) {
//     req.passValidator = body("email").isEmail(),
//     body("password").custom((value) => {
//       var schema = new passwordValidator();
//       schema
//         .is()
//         .min(8)
//         .is()
//         .max(100)
//         .has()
//         .uppercase()
//         .has()
//         .lowercase()
//         .has()
//         .digits(2)
//         .has()
//         .not()
//         .spaces()
//         .is()
//         .not()
//         .oneOf(["Passw0rd", "Password123"]);
//       return schema.validate(value);
//     }),
//     next()
//   }


// module.exports = passValidator;



