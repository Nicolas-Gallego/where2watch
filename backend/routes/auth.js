const express = require("express");
const router = express.Router();
const UserModel = require("../models/User");
const { body, validationResult } = require("express-validator");
const passwordValidator = require("password-validator");
const bcrypt = require("bcryptjs");
const path = require("path");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
var multer = require("multer");
const fs = require("fs");
// const passValidator = require("../middlewares/auth.middlewares")
const upload = multer({ dest: "Public/profilePicture" });
router.use(express.static("Public"));

dotenv.config();


//Signup router
router.post("/signup", upload.single("profilePicture"), async (req, res) => {
  if (req.file) {
    let pP = fs.renameSync(
      req.file.path,
      path.join(req.file.destination, `${req.body.username}.png`)
    );
  }
  console.log("req.body", req.body);

  const user = new UserModel({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
    age: req.body.age,
    platforms: req.body.Platforms,
    profilePicture: `profilePicture/${req.body.username}.png`,
  });
  try {
    await user.save();
    res.json({ message: "utilisateur enregister", saveUser: user._id });
  } catch (err) {
    res.json({ message: err });
  }
});

//Show login router
router.get("/login", (req, res) => {
  res.render("login");
});

//Login router
router.post("/login", async (req, res) => {
  const user = await UserModel.findOne({
    username: req.body.username,
  });

  if (user == null) {
    return res.status(400).send({ message: "Email is not found" });
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const token = jwt.sign({ _id: user.id }, process.env.TOKEN_SECRET);
      res.header("auth-token", token).send(token);
      //res.send("Login success")
    } else {
      res.send("Invalid password");
    }
  } catch {
    res.status(500).send();
  }
});

//Profil router
router.get("/profile/:id", async (req, res) => {
  try {
    const userProfil = await UserModel.findById(req.params.id);
    res.json({userProfil });
  } catch (err) {
    res.json({ message: err });
  }
});

//updateProfil router

router.put("/updateUsername/:id", async (req, res) => {
  try {
    const updateProfil = await UserModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          username: req.body.username,
        },
      }
    );
    res.json(updateProfil);
  } catch (err) {
    res.json({ message: err });
  }
});

//Update email router
router.put("/updateEmail/:id", async (req, res) => {
  try {
    const updateProfil = await UserModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          email: req.body.email,
        },
      }
    );
    res.json(updateProfil);
  } catch (err) {
    res.json({ message: err });
  }
});

//Update password router
router.put("/updatePassword/:id", async (req, res) => {
  try {
    const updateProfil = await UserModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          password: req.body.password,
        },
      }
    );
    res.json(updateProfil);
  } catch (err) {
    res.json({ message: err });
  }
});

//Update age router
router.put("/updateAge/:id", async (req, res) => {
  try {
    const updateProfil = await UserModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          age: req.body.age,
        },
      }
    );
    res.json(updateProfil);
  } catch (err) {
    res.json({ message: err });
  }
});

//Update platforms router
router.put("/updatePatforms/:id", async (req, res) => {
  try {
    const updateProfil = await UserModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          platforms: req.body.platforms,
        },
      }
    );
    res.json(updateProfil);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
