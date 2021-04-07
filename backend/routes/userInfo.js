const express = require('express');
const router = express.Router();
const UserModel = require('../models/User');






// router.post('/signup', async (req, res) => {
//     const user = new UserModel({
//         username: req.body.username,
//         email: req.body.email,
//         password: req.body.password,
//         age: req.body.age,
//         platform: req.body.platform,
//         profilePicture: req.body.profilePicture
//     })
//     try {
//         const saveUser = await user.save()
//         res.json(saveUser)

//     } catch (err) {
//         res.json({ message: err })
//     }

// })

router.post('/login', async (req, res) => {
    const user = new UserModel({
    username: req.body.username,
    password: req.body.password,
})
try {
    const findUser = await user.findOne()
    res.json(findUser)

} catch (err) {
    res.json({ message: err })
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

module.exports = router;