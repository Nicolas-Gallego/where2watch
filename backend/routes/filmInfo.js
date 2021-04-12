const express = require("express");
const router = express.Router();
const FilmModel = require("../models/Film");


router.get("/moovice", async (req, res) => {
  const films = await FilmModel.find({});
  res.json({
    films: films,
    message: "tu as fait une requete GET sur /films",
  });
});

router.get("/moovice/:id", async (req, res) => {
  const film = await FilmModel.findOne({id_imdb : req.params.id}).exec();
  res.json({
    film: film,
    message: "tu as fait une requete GET sur /films/:id",
  });
});

module.exports = router;
