const express = require("express");
const router = express.Router();
const FilmModel = require("../models/Film");

router.get("/moovice", (req, res) => {
  const films = FilmModel.find({});
  res.json({
    films: films,
    message: "tu as fait une requete GET sur /moovice",
  });
});

module.exports = router;
