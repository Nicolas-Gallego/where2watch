const express = require('express');
const router = express.Router();
const UserModel = require('../models/User');

router.post('/signup', async (req, res) => {
    const user = new UserModel({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age,
        platform: req.body.platform,
        profilePicture: req.body.profilePicture
    })
    try {
        const saveUser = await user.save()
        res.json(saveUser)

    } catch (err) {
        res.json({ message: err })
    }

})

module.exports = router;