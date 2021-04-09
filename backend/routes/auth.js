const express = require('express');
const router = express.Router();
const UserModel = require('../models/User');
const { body, validationResult } = require('express-validator');
const passwordValidator = require('password-validator');



//Signup router
router.post('/signup',
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
        console.log(req.body)
        const user = new UserModel({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            age: req.body.age,
            platforms: req.body.platforms,
            profilePicture: req.body.profilePicture
        })
        try {
            const saveUser = await user.save()
            res.json(saveUser)

        } catch (err) {
            res.json({ message: err })
        }
    })

//Login router

// router.post('/login', async (req, res) => {
//     try {
//         const body = req.body
//         const user = await UserModel.findOne({
//             username: body.username
//         })
//         if (!user) {
//             return res.status(404).send("There are no user")
//         }
//         if (user.password !== body.password) {
//             return res.status(404).json({
//                 isConnected: false
//             })
//         }

//     } catch (err) {
//         console.error(err)
//         res.status(404).json({
//             isConnected: false
//         })
//     }
// })
//Show login router
router.get("/login", (req, res) => {
    res.render("login")
  })

// router.post('/login', async(req, res)=>{
//     const user = await UserModel.find(user => user.name = req.body.name)
//     if(user == null){
//         return res.status(400).send("There are no user")
//     }
//     try{

//     }catch{

//     }
// })






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

module.exports = router;

