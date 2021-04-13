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

app.get("/home/:cat", async (req, res) => {
  const myFilms = await FilmModel.find({ platforme: req.params.cat }).exec();
  console.log(myFilms);
  res.json({ films: myFilms, message: "coucou" });
  console.log(req.params.cat);
  console.log("coucou");
});

app.listen(8000, () => {
  console.log("Server running port 8000.......");
});
