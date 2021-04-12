const express = require('express');
const router = express.Router();
const UserModel = require('../models/User');
const { body, validationResult } = require('express-validator');
const passwordValidator = require('password-validator');
const bcrypt = require('bcryptjs');
const path = require('path');

var multer = require('multer');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({ 
    storage: storage
 }).single('profilePicture')






//Signup router
router.post('/signup', upload,
    body('email').isEmail(),
    body('password').custom((value) => {
        var schema = new passwordValidator();
        schema
            .is().min(8)
            .is().max(100)
            .has().uppercase()
            .has().lowercase()
            .has().digits(2)
            .has().not().spaces()
            .is().not().oneOf(["Passw0rd", "Password123"]);
        return schema.validate(value);
    }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        console.log(req.file)

        console.log(req.body)
        const user = new UserModel({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password),
            age: req.body.age,
            platforms: req.body.platforms,
            profilePicture: req.body.file
        })
        try {
            const saveUser = await user.save()
            res.json(saveUser)

        } catch (err) {
            res.json({ message: err })
        }
    })


//Show login router
router.get("/login", (req, res) => {
    res.render("login")
})

//Login router
router.post('/login', async (req, res) => {
    const body = req.body
    const user = await UserModel.findOne({
        username: body.username
    })
    if (user == null) {
        return res.status(400).send("Email is not found")
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send("Login success")
        } else {
            res.send("Invalid password")
        }

    } catch {
        res.status(500).send()
    }
})






//Profil router
router.get('/profile/:id', async (req, res) => {
    try {
        const userProfil = await UserModel.findById(req.params.id)
        res.json(userProfil)

    } catch (err) {
        res.json({ message: err })
    }
})


//updateProfil router

router.put('/updateUsername/:id', async (req, res) => {
    try {
        const updateProfil = await UserModel.updateOne({ _id: req.params.id },
            {
                $set: {
                    username: req.body.username
                }
            })
        res.json(updateProfil)

    } catch (err) {
        res.json({ message: err })
    }
})

//Update email router
router.put('/updateEmail/:id', async (req, res) => {
    try {
        const updateProfil = await UserModel.updateOne({ _id: req.params.id },
            {
                $set: {
                    email: req.body.email
                }
            })
        res.json(updateProfil)

    } catch (err) {
        res.json({ message: err })
    }
})


//Update password router
router.put('/updatePassword/:id', async (req, res) => {
    try {
        const updateProfil = await UserModel.updateOne({ _id: req.params.id },
            {
                $set: {
                    password: req.body.password
                }
            })
        res.json(updateProfil)

    } catch (err) {
        res.json({ message: err })
    }
})

//Update age router
router.put('/updateAge/:id', async (req, res) => {
    try {
        const updateProfil = await UserModel.updateOne({ _id: req.params.id },
            {
                $set: {
                    age: req.body.age
                }
            })
        res.json(updateProfil)

    } catch (err) {
        res.json({ message: err })
    }
})

//Update platforms router
router.put('/updatePatforms/:id', async (req, res) => {
    try {
        const updateProfil = await UserModel.updateOne({ _id: req.params.id },
            {
                $set: {
                    platforms: req.body.platforms
                }
            })
        res.json(updateProfil)

    } catch (err) {
        res.json({ message: err })
    }
})

module.exports = router;

