const express = require("express");
const router = express.Router();
const FilmModel = require("../models/Film");

router.get("/moovice", async (req, res) => {
  const films = await FilmModel.find({}).limit(20);
  res.json({
    films: films,
    message: "tu as fait une requete GET sur /films/moovice",
  });
});

router.get("/moovice/search/:name?", async (req, res) => {
  let films;
  console.log("req.params.name", req.params.name);
  if (req.params.name) {
    films = await FilmModel.find({ titre: new RegExp(req.params.name) });
  }

  if (films) {
    res.json({
      films: films,
      message: "tu as fait une requete GET sur /films/moovice/search/:name",
    });
  }
});

router.get("/moovice/:id", async (req, res) => {
  const film = await FilmModel.findOne({ id_imdb: req.params.id }).exec();
  res.json({
    film: film,
    message: "tu as fait une requete GET sur /films/moovice/:id",
  });
});

module.exports = router;
