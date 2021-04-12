const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoute = require("./routes/auth"); //Import routes
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
app.use("/user", () => authRoute);

app.get("/films", async (req, res) => {
  const films = await FilmModel.find({});
  res.json({
    films: films,
    message: "tu as fait une requete GET sur /films",
  });
});

app.get("/films/:id", async (req, res) => {
  const film = await FilmModel.findById(req.params.id);
  res.json({
    film: film,
    message: "tu as fait une requete GET sur /films/:id",
  });
});

app.listen(8000, () => {
  console.log("Server running port 8000.......");
});
