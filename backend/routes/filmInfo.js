const express = require('express');
const router = express.Router();
const FilmModel = require('../models/Film');


router.get('/',
res.json({message: "tui as fait une requete GET sur /"})
)


module.exports = router;
