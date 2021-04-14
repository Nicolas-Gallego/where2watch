const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoute = require("./routes/auth"); //Import routes
const filmRoute = require("./routes/filmInfo"); //Import films
const cors = require("cors");
const FilmModel = require("./models/Film");

//Connect to db
mongoose.connect(
  "mongodb://localhost:27017/w2w",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("db connect........");
  }
);

//Middlewares
app.use(express.json());
app.use(cors());

//Route Middlewares
app.use("/user", authRoute);
app.use("/films", filmRoute);

app.post("/home", async (req, res) => {
  console.log("requete faite a POST /home ");
  // si je recois un genre et une platforme
  if (req.body.cat.length && req.body.genres.length) {
    const myFilms = await FilmModel.find({
      platforme: { $in: req.body.cat },
      genres: { $in: req.body.genres },
    }).exec();
    res.json({ films: myFilms, message: "coucou" });
  } else if (req.body.genres.length) {
    //sinon si je recois juste un genre
    const myFilms = await FilmModel.find({
      genres: { $in: req.body.genres },
    }).exec();
    res.json({ films: myFilms, message: "coucou" });
  } else if (req.body.cat.length) {
    //sinon si je recois juste une platforme
    const myFilms = await FilmModel.find({
      platforme: { $in: req.body.cat },
    }).exec();
    res.json({ films: myFilms, message: "coucou" });
  } else {
    // par défaut je recois 100 films
    const myFilms = await FilmModel.find({}).limit(100).exec();
    res.json({ films: myFilms, message: "coucou" });
  }
});

app.listen(8000, () => {
  console.log("Server running port 8000.......");
});
