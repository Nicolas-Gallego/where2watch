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
  let limit = 2;
  let page = 0;

  if (req.query.limit) {
    if (!parseInt(req.query.limit) || parseInt(req.query.limit) < 1) {
      res.status(400).json({ message: "Limit must be a positive number" });
    }
    limit = req.query.limit;
  }
  if (req.query.page) {
    page = req.query.page;
  }
  console.log(" début limit", limit);
  console.log(" début page", page);

  console.log("lol", req.query);
  console.log("requete faite a POST /home ");

  console.log("req.body.platform", req.body.platform);
  console.log("req.body.genres", req.body.genres);

  // si je recois un genre et une platforme
  if (req.body.platform && req.body.genres) {
    console.log("jai les deux");
    const myFilms = await FilmModel.find({
      platforme: { $in: req.body.platform },
    })
      .find({ genres: { $in: req.body.genres } })
      .exec();
    res.json({ films: myFilms, message: `voici les films` });
  } else if (req.body.genres) {
    console.log("jai un genre");
    //sinon si je recois juste un genre
    const myFilms = await FilmModel.find({
      genres: { $in: req.body.genres },
    }).exec();
    res.json({ films: myFilms, message: `voici les films` });
  } else if (req.body.platform) {
    console.log("jai une platform");
    // console.log("tkt", `/${req.body.platform.join("|")}/gi`);
    //sinon si je recois juste une platforme

    const myFilms = await FilmModel.find({
      platforme: { $in: req.body.platform },
    }).exec();

    res.json({ films: myFilms, message: `voici les films` });
  } else {
    console.log(" fin limit", limit);
    console.log(" fin page", page);
    console.log("jai pas de params");
    // par défaut je recois 100 films
    const myFilms = await FilmModel.aggregate()
      .skip(parseInt(page * limit))
      .limit(parseInt(limit))
      .exec();
      console.log(myFilms)
    res.json({
      films: myFilms,
      message: `voici les films`,
      count: await FilmModel.countDocuments(),
    });
  }
});

app.listen(8000, () => {
  console.log("Server running port 8000.......");
});
