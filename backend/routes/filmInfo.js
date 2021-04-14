const express = require("express");
const router = express.Router();
const FilmModel = require("../models/Film");

router.get("/moovice", async (req, res) => {
  const films = await FilmModel.find({}).limit(20);
  res.json({
    films: films,
    message: "tu as fait une requete GET sur /films",
  });
});

router.get("/moovice/search/:name", async (req, res) => {
  console.log("req.params.name", req.params.name);
  const films = await FilmModel.find({titre : new RegExp(req.params.name)});
  console.log(films);
  if (films) {
    res.json({
      films: films,
      message: "tu as fait une requete GET sur /films/:name",
    });
  }
});

router.get("/moovice/:id", async (req, res) => {
  const film = await FilmModel.findOne({ id_imdb: req.params.id }).exec();
  res.json({
    film: film,
    message: "tu as fait une requete GET sur /films/:id",
  });
});

module.exports = router;
